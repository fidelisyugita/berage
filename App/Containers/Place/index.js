/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  TouchableHighlight,
  PermissionsAndroid,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';
import {getDistance} from 'geolib';
import Geolocation from 'react-native-geolocation-service';

import FavoriteActions from '../../Redux/FavoriteRedux';
import PlaceActions from '../../Redux/PlaceRedux';
import PostActions from '../../Redux/PostRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale, DisplayMoney} from '../../Transforms';
import {
  ConvertDistance,
  UploadImage,
  EstimateDriveTime,
  DeleteImage,
} from '../../Lib';
import FirebasePlace from '../../Lib/FirebasePlace';

import CustomImage from '../../Components/CustomImage';
import Post from '../../Components/Post/Post';
import {DropDownHolder} from '../../Components/DropDownHolder';
import Loader from '../../Components/Loader';
import ModalLoader from '../../Components/Modal/ModalLoader';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

// import {posts} from '../Dummy';

let firebasePlace;
const MAX_LENGTH = 280;

export class PlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      item: props.navigation.getParam('item', null),
      isLiked: false,
      onlineUsers: [],
      textToPost: '',
      imageToPost: null,
      slotLeft: 0,
    };
  }

  componentDidMount() {
    this.checkFavorite();
    this.loadData();
    /**
     * TODO
     * add login
     */
  }

  componentWillUnmount() {
    const {currentUser} = this.props;

    if (firebasePlace) {
      firebasePlace.off();
      firebasePlace = null;
      this.setState({onlineUsers: []});
    }
  }

  loadData() {
    const {currentUser, getPostsRequest, rootPosts} = this.props;
    const {item, onlineUsers, refreshing} = this.state;
    const tempUsers = [...onlineUsers];

    // console.tron.log({item});
    console.tron.log({onlineUsers});
    /**
     * TODO
     * need check & improve
     * how to remove user that left the place
     */
    if (item && item.id) {
      if (!refreshing) {
        firebasePlace = new FirebasePlace(item.id, currentUser);
        firebasePlace.onOnlineUsers(newUser => {
          console.tron.log({newUser});
          const userIndex = tempUsers.findIndex(
            user => user.uid === newUser.uid,
          );
          if (userIndex > -1) tempUsers.splice(userIndex, 1, newUser);
          else tempUsers.push(newUser);
          this.setState({onlineUsers: tempUsers});
        });

        firebasePlace.onPlace(placeStatus => {
          console.tron.log({placeStatus});
          if (placeStatus && placeStatus.slotLeft !== null)
            this.setState({slotLeft: placeStatus.slotLeft});
        });
      }

      if (refreshing || !rootPosts[item.id] || rootPosts[item.id].length < 1)
        getPostsRequest({placeId: item.id}, this.getPostsCallback);
    }
  }

  getPostsCallback = result => {
    if (result.ok) {
      console.tron.log({result});
    }
    this.setState({refreshing: false});
  };

  checkFavorite() {
    const {favoriteIds} = this.props;
    const {item} = this.state;

    if (item && item.id && favoriteIds) {
      if (favoriteIds.includes(item.id)) this.setState({isLiked: true});
    }
  }

  addRemoveFavorite = () => {
    const {currentUser, addFavoriteRequest, removeFavoriteRequest} = this.props;
    const {item, isLiked} = this.state;

    if (!currentUser)
      DropDownHolder.alert('warn', I18n.t('loginFirst'), undefined);
    else if (item && item.id) {
      this.setState({isLoading: true});

      const data = {...item, placeId: item.id};

      if (isLiked) removeFavoriteRequest(data, this.addRemoveFavoriteCallback);
      else addFavoriteRequest(data, this.addRemoveFavoriteCallback);
    }
  };

  addRemoveFavoriteCallback = result => {
    const {isLiked} = this.state;
    console.tron.log({addRemoveFavorite: result});

    if (result.ok) this.setState({isLoading: false, isLiked: !isLiked});
    else this.setState({isLoading: false});
  };

  onSetPopular = () => {
    const {item} = this.state;

    if (item && item.id) this.props.setPopularRequest(item);
  };

  onSetRecommended = () => {
    const {item} = this.state;

    if (item && item.id) this.props.setRecommendedRequest(item);
  };

  addImage = async () => {
    const {item} = this.state;

    try {
      const image = await UploadImage(
        `posts/${(item && item.id) || 'random'}`,
        480,
        480,
      );
      console.tron.log({image});
      this.setState({imageToPost: image});
    } catch (error) {
      console.tron.log({error});
      DropDownHolder.alert(
        'error',
        I18n.t('errorDefault'),
        error.message || I18n.t('tryAgain'),
      );
    }
  };

  async deleteImage(image) {
    try {
      const response = await DeleteImage(image.refPath);
      console.tron.log({response});
      this.setState({imageToPost: null});
    } catch (error) {
      console.tron.log({error});
      DropDownHolder.alert(
        'error',
        I18n.t('errorDefault'),
        error.message || I18n.t('tryAgain'),
      );
    }
  }

  onSubmitPress = () => {
    const {item, textToPost, imageToPost} = this.state;
    const {addPostRequest} = this.props;

    if (textToPost.length < 1) {
      DropDownHolder.alert('warn', I18n.t('textIsEmpty'), undefined);
    } else {
      this.setState({isLoading: true});

      const data = {
        placeId: item.id,
        text: textToPost,
        image: imageToPost
          ? {
              uri: imageToPost.uri,
              refPath: imageToPost.refPath,
            }
          : null,
      };

      console.tron.log({data});

      addPostRequest(data, this.addPostCallback);
    }
  };

  addPostCallback = result => {
    this.setState({isLoading: false, textToPost: '', imageToPost: null});
    console.tron.log({result});
  };

  onRefresh = () => {
    this.setState({refreshing: true}, () => this.loadData());
  };

  onPostPress = () => {
    const {navigation, currentUser} = this.props;

    if (!currentUser)
      DropDownHolder.alert('warn', I18n.t('loginFirst'), undefined);
  };

  onJoinPress = () => {
    const {navigation, currentUser, userLocation} = this.props;
    const {item, onlineUsers} = this.state;

    if (!currentUser) {
      DropDownHolder.alert('warn', I18n.t('loginFirst'), undefined);
    } else {
      if (currentUser.superUser) {
        navigation.navigate('OnlineUsersScreen', {item, onlineUsers});
        return;
      }

      let distance = '-';
      if (item.location && userLocation)
        distance = ConvertDistance(
          getDistance(userLocation, item.location),
          1000,
        );
      if (parseFloat(distance) < 0.5) {
        navigation.navigate('OnlineUsersScreen', {item, onlineUsers});
      } else DropDownHolder.alert('warn', I18n.t('notInArea'), undefined);
    }
  };

  onSlotIncrease = () => {
    const {slotLeft} = this.state;

    firebasePlace.change(slotLeft + 1);
  };

  onSlotDecrease = () => {
    const {slotLeft} = this.state;

    if (slotLeft >= 0) firebasePlace.change(slotLeft - 1);
  };

  render() {
    const {
      navigation,
      currentUser,
      userLocation,
      setPopular,
      setRecommended,
      rootPosts,
      getPosts,
      addPost,
      likePost,
      dislikePost,
    } = this.props;
    const {
      refreshing,
      item,
      isLiked,
      isLoading,
      onlineUsers,
      textToPost,
      imageToPost,
      slotLeft,
    } = this.state;

    const owner = item.updatedBy || item.createdBy;
    const posts = rootPosts[item.id];

    const status = slotLeft < 0 ? I18n.t('closed') : I18n.t('open');

    let distance = '-';

    if (item.location && userLocation)
      distance = ConvertDistance(
        getDistance(userLocation, item.location),
        1000,
      );

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
        }>
        <ModalLoader
          visible={
            setPopular.fetching ||
            setRecommended.fetching ||
            addPost.fetching ||
            isLoading
          }
        />
        <View style={AppStyles.shadow}>
          <View>
            <TouchableHighlight
              onPress={() => navigation.pop()}
              style={{...AppStyles.btnIcon, ...styles.headerIcon}}>
              <AntDesign
                name="arrowleft"
                size={Metrics.icons.tiny}
                color={Colors.silver}
              />
            </TouchableHighlight>
            <TouchableHighlight
              // onPress={() => navigation.pop()}
              style={{
                ...AppStyles.btnIcon,
                ...styles.headerIcon,
                left: Scale(280),
              }}>
              <AntDesign
                name="sharealt"
                size={Metrics.icons.tiny}
                color={Colors.silver}
              />
            </TouchableHighlight>
            {owner && currentUser && owner.uid === currentUser.uid ? (
              <TouchableHighlight
                onPress={() => navigation.navigate('AddPlaceScreen', {item})}
                style={{
                  ...AppStyles.btnIcon,
                  ...styles.headerIcon,
                  left: Scale(325),
                }}>
                <AntDesign
                  name={'edit'}
                  size={Metrics.icons.tiny}
                  color={Colors.silver}
                />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                onPress={this.addRemoveFavorite}
                style={{
                  ...AppStyles.btnIcon,
                  ...styles.headerIcon,
                  left: Scale(325),
                }}>
                <AntDesign
                  name={isLiked ? 'heart' : 'hearto'}
                  size={Metrics.icons.tiny}
                  color={isLiked ? Colors.fire : Colors.silver}
                />
              </TouchableHighlight>
            )}
            <Swiper
              height={Metrics.images.xl + Metrics.marginVertical}
              autoplay={true}
              loop={true}
              showsButtons={false}
              showsPagination={true}>
              {item.images.map(image => (
                <CustomImage
                  key={image}
                  source={{uri: image.uri ? image.uri : image}}
                  style={{
                    ...AppStyles.border5,
                    width: '100%',
                    height: Metrics.images.xl,
                  }}
                />
              ))}
            </Swiper>
          </View>

          <View style={[AppStyles.sectionMargin, AppStyles.borderBottom5]}>
            <Text style={Fonts.style.large3}>{item.name || '-'}</Text>
            <Text style={[Fonts.style.small2, AppStyles.containerSmall]}>
              {item.categories.join(', ')}
            </Text>
            <Text
              style={[
                Fonts.style.small,
                AppStyles.containerSmall,
                AppStyles.containerBottom,
              ]}>
              {item.description}
            </Text>
          </View>
          <View
            style={[
              AppStyles.sectionVertical,
              AppStyles.section,
              AppStyles.row,
              AppStyles.borderBottom7,
            ]}>
            <View
              style={[
                AppStyles.baseMarginRight,
                AppStyles.minWidth3,
                AppStyles.row,
              ]}>
              <View>
                <View style={AppStyles.row}>
                  <Fontisto
                    name="clock"
                    size={Metrics.icons.tiny}
                    color={Colors.baseText}
                  />
                  <Text
                    style={[AppStyles.smallMarginLeft, Fonts.style.medium3]}>
                    {status}
                  </Text>
                </View>
                <Text style={[Fonts.style.small, AppStyles.containerTiny]}>
                  {`${I18n.t('available')}: ${slotLeft < 1 ? '?' : slotLeft}`}
                </Text>
              </View>
            </View>
            <View style={AppStyles.flex1}>
              <View style={AppStyles.row}>
                <Fontisto
                  name="map-marker-alt"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
                <Text style={[AppStyles.smallMarginLeft, Fonts.style.medium3]}>
                  {`${distance} km`}
                </Text>
              </View>
              <Text style={[Fonts.style.small, AppStyles.containerTiny]}>
                {distance !== '-'
                  ? `${EstimateDriveTime(distance)} ${I18n.t('minute')}`
                  : '-'}
              </Text>
            </View>
            <View style={AppStyles.flex1}>
              <View style={AppStyles.row}>
                <Fontisto
                  name="dollar"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
                <Fontisto
                  name="dollar"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
                <Fontisto
                  name="dollar"
                  size={Metrics.icons.tiny}
                  color={Colors.border}
                />
                <Fontisto
                  name="dollar"
                  size={Metrics.icons.tiny}
                  color={Colors.border}
                />
              </View>
              <Text style={[Fonts.style.small, AppStyles.containerTiny]}>
                {DisplayMoney(item.minPrice)}-{DisplayMoney(item.maxPrice)}
              </Text>
            </View>
          </View>
        </View>

        {((currentUser && currentUser.superUser) ||
          (owner && currentUser && owner.uid === currentUser.uid)) && (
          <View style={styles.containerOnline}>
            <View style={{...styles.sectionOnline}}>
              <TouchableHighlight
                underlayColor={Colors.highlightUnderlay}
                onPress={this.onSlotIncrease}
                style={styles.btnSave}>
                <Text style={[Fonts.style.large]}>+</Text>
              </TouchableHighlight>
              <View style={{width: Metrics.baseMargin}} />
              <TouchableHighlight
                underlayColor={Colors.highlightUnderlay}
                onPress={this.onSlotDecrease}
                style={styles.btnSave}>
                <Text style={[Fonts.style.large]}>-</Text>
              </TouchableHighlight>
            </View>
          </View>
        )}

        <View style={styles.containerOnline}>
          <View style={styles.sectionOnline}>
            <Text style={[Fonts.style.xl]}>
              {`${I18n.t('peopleAreOnline')}: ${onlineUsers.length || '?'}`}
            </Text>
            <TouchableHighlight
              // disabled={!currentUser}
              underlayColor={Colors.highlightUnderlay}
              onPress={this.onJoinPress}
              style={[
                AppStyles.section,
                AppStyles.sectionVerticalSmall,
                AppStyles.shadow,
                AppStyles.borderImage,
                AppStyles.alignCenter,
              ]}>
              <Text style={[Fonts.style.xl]}>{I18n.t('join')}</Text>
            </TouchableHighlight>
          </View>
        </View>

        {currentUser && currentUser.superUser && (
          <View style={styles.containerOnline}>
            <View style={{...styles.sectionOnline, flexDirection: 'column'}}>
              <TouchableHighlight
                underlayColor={Colors.highlightUnderlay}
                onPress={this.onSetPopular}
                style={styles.btnSave}>
                <Text style={[Fonts.style.large]}>{I18n.t('setPopular')}</Text>
              </TouchableHighlight>

              <View style={{height: Metrics.baseMargin}} />

              <TouchableHighlight
                underlayColor={Colors.highlightUnderlay}
                onPress={this.onSetRecommended}
                style={styles.btnSave}>
                <Text style={[Fonts.style.large]}>
                  {I18n.t('setRecommended')}
                </Text>
              </TouchableHighlight>

              <View style={{height: Metrics.baseMargin}} />

              <TouchableHighlight
                underlayColor={Colors.highlightUnderlay}
                // onPress={this.onSetRecommended}
                style={styles.btnSave}>
                <Text style={[Fonts.style.large]}>{I18n.t('verify')}</Text>
              </TouchableHighlight>
            </View>
          </View>
        )}

        <View
          style={[
            AppStyles.container,
            AppStyles.section,
            AppStyles.sectionVerticalBase,
            AppStyles.shadow,
          ]}>
          <View style={[AppStyles.row]}>
            {currentUser && currentUser.photoURL ? (
              <CustomImage
                source={{uri: currentUser.photoURL}}
                style={[
                  AppStyles.avatarMedium,
                  AppStyles.borderCircle,
                  AppStyles.border3,
                ]}
                imageStyle={AppStyles.borderCircle}
              />
            ) : (
              <IconUserDefault
                width={Metrics.avatars.medium}
                height={Metrics.avatars.medium}
              />
            )}
            <View style={[AppStyles.flex1, AppStyles.baseMarginLeft]}>
              <TextInput
                // onFocus={!currentUser ? this.onPostPress : () => {}}
                editable={
                  currentUser != null &&
                  (currentUser.superUser || parseFloat(distance) < 0.5)
                } //less than 500m
                value={textToPost}
                placeholder={
                  currentUser != null
                    ? parseFloat(distance) < 0.5
                      ? I18n.t('tellUsPlaceholder')
                      : I18n.t('toFarPlaceholder')
                    : I18n.t('loginFirstPlaceholder')
                }
                multiline={true}
                maxLength={MAX_LENGTH}
                onChangeText={text => this.setState({textToPost: text})}
                style={[
                  Fonts.style.large,
                  AppStyles.flex1,
                  AppStyles.smallPaddingTop,
                ]}
              />
              {imageToPost && (
                <View>
                  <CustomImage
                    source={{uri: imageToPost.path || imageToPost.uri}}
                    style={{
                      ...AppStyles.borderImage,
                      ...AppStyles.border5,
                      ...AppStyles.baseMarginBottom,
                      height: Metrics.screenWidth - Scale(90),
                      width: Metrics.screenWidth - Scale(90),
                    }}
                    imageStyle={AppStyles.borderImage}
                  />
                  <TouchableOpacity
                    style={[AppStyles.btnIcon, AppStyles.positionAbsolute]}
                    onPress={() => this.deleteImage(imageToPost)}>
                    <MaterialIcons
                      name="cancel"
                      size={Metrics.icons.medium}
                      color={Colors.baseText}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <View
                style={[
                  AppStyles.row,
                  AppStyles.alignCenter,
                  AppStyles.justifyBetween,
                ]}>
                <TouchableOpacity
                  disabled={
                    imageToPost ||
                    !currentUser ||
                    ((distance === '-' || parseFloat(distance)) >= 0.5 &&
                      !currentUser.superUser)
                  }
                  onPress={this.addImage}>
                  <AntDesign
                    name="picture"
                    size={Metrics.icons.medium}
                    color={Colors.baseText}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.onSubmitPress}
                  // disabled={textToPost.length < 1}
                  style={[
                    AppStyles.section,
                    AppStyles.sectionVerticalBase,
                    AppStyles.borderCircle,
                    AppStyles.darkShadow,
                  ]}>
                  <Text style={[Fonts.style.medium]}>{I18n.t('berage')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {getPosts.fetching && <Loader style={[AppStyles.container]} />}
        <FlatList
          style={[AppStyles.container]}
          data={posts || []}
          keyExtractor={(item, idx) => `post-${idx}`}
          renderItem={({item, idx}) => (
            <Post
              item={item}
              // onPress={() => navigation.navigate('PlaceScreen', {item})}
            />
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerIcon: {
    backgroundColor: Colors.windowTint,
    borderRadius: Metrics.circleRadius,
    position: 'absolute',
  },
  btnSave: {
    ...AppStyles.flex1,
    // ...AppStyles.section,
    ...AppStyles.sectionVerticalBase,
    ...AppStyles.alignCenter,
    ...AppStyles.border7,
    ...AppStyles.borderImage,
    ...AppStyles.shadow,
    width: '100%',
  },
  containerOnline: {
    ...AppStyles.container,
    ...AppStyles.section,
    ...AppStyles.sectionVerticalBase,
    ...AppStyles.shadow,
  },
  sectionOnline: {
    ...AppStyles.row,
    ...AppStyles.justifyBetween,
    ...AppStyles.section,
    ...AppStyles.sectionVerticalBase,
    ...AppStyles.borderImage,
    ...AppStyles.alignCenter,
    backgroundColor: Colors.tempHomeLoader,
  },
});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  userLocation: state.session.userLocation,
  favoriteIds: state.session.favoriteIds,
  setPopular: state.place.setPopular,
  setRecommended: state.place.setRecommended,
  rootPosts: state.post.rootPosts,
  getPosts: state.post.getPosts,
  addPost: state.post.addPost,
  likePost: state.post.likePost,
  dislikePost: state.post.dislikePost,
});

const mapDispatchToProps = dispatch => ({
  addFavoriteRequest: (data, callback) =>
    dispatch(FavoriteActions.addFavoriteRequest(data, callback)),
  removeFavoriteRequest: (data, callback) =>
    dispatch(FavoriteActions.removeFavoriteRequest(data, callback)),
  setPopularRequest: (data, callback) =>
    dispatch(PlaceActions.setPopularRequest(data, callback)),
  setRecommendedRequest: (data, callback) =>
    dispatch(PlaceActions.setRecommendedRequest(data, callback)),
  getPostsRequest: (data, callback) =>
    dispatch(PostActions.getPostsRequest(data, callback)),
  addPostRequest: (data, callback) =>
    dispatch(PostActions.addPostRequest(data, callback)),
  likePostRequest: (data, callback) =>
    dispatch(PostActions.likePostRequest(data, callback)),
  dislikePostRequest: (data, callback) =>
    dispatch(PostActions.dislikePostRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaceScreen);
