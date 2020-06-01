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
} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Swiper from 'react-native-swiper';
import {getDistance} from 'geolib';
import Geolocation from 'react-native-geolocation-service';

import FavoriteActions from '../../Redux/FavoriteRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale, DisplayMoney} from '../../Transforms';
import {ConvertDistance} from '../../Lib';
import FirebasePlace from '../../Lib/FirebasePlace';

import CustomImage from '../../Components/CustomImage';
import Post from '../../Components/Post/Post';
import {DropDownHolder} from '../../Components/DropDownHolder';
import Loader from '../../Components/Loader';
import ModalLoader from '../../Components/Modal/ModalLoader';

import {posts} from '../Dummy';

let firebasePlace;

export class PlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      item: props.navigation.getParam('item', null),
      isLiked: false,
      onlineUsers: [],
    };
  }

  componentDidMount() {
    this.checkFavorite();
    this.loadData();
  }

  componentWillUnmount() {
    const {currentUser} = this.props;

    if (firebasePlace) {
      firebasePlace.offOnlineUsers();
      firebasePlace = null;
      this.setState({onlineUsers: []});
    }
  }

  loadData() {
    const {currentUser} = this.props;
    const {item, onlineUsers} = this.state;
    const tempUsers = [...onlineUsers];

    console.tron.log({item});
    console.tron.log({onlineUsers});
    /**
     * TODO
     * need check & improve
     * how to remove user that left the place
     */
    if (item && item.id) {
      firebasePlace = new FirebasePlace(item.id, currentUser);
      firebasePlace.onOnlineUsers(newUser => {
        console.tron.log({newUser});
        const userIndex = tempUsers.findIndex(user => user.uid === newUser.uid);
        if (userIndex > -1) tempUsers.splice(userIndex, 1, newUser);
        else tempUsers.push(newUser);
        this.setState({onlineUsers: tempUsers});
      });
    }
  }

  checkFavorite() {
    const {favoriteIds} = this.props;
    const {item} = this.state;

    if (item && item.id && favoriteIds) {
      if (favoriteIds.includes(item.id)) this.setState({isLiked: true});
    }
  }

  addRemoveFavorite = () => {
    const {addFavoriteRequest, removeFavoriteRequest} = this.props;
    const {item, isLiked} = this.state;

    if (item && item.id) {
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

  render() {
    const {navigation, currentUser, userLocation} = this.props;
    const {item, isLiked, isLoading, onlineUsers} = this.state;

    const owner = item.updatedBy || item.createdBy;

    return (
      <ScrollView>
        <ModalLoader visible={isLoading} />
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
                  source={{uri: image}}
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
            <Text style={Fonts.style.medium3}>{item.name || '-'}</Text>
            <Text
              style={[
                Fonts.style.small,
                AppStyles.containerSmall,
                AppStyles.containerBottom,
              ]}>
              {item.categories.join(', ')}
            </Text>
          </View>
          <View
            style={[
              AppStyles.sectionVertical,
              AppStyles.section,
              AppStyles.row,
              AppStyles.borderBottom7,
            ]}>
            <View style={[AppStyles.baseMarginRight, AppStyles.minWidth3]}>
              <View style={AppStyles.row}>
                <Fontisto
                  name="clock"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
                <Text style={[AppStyles.smallMarginLeft, Fonts.style.medium3]}>
                  {item.status || '-'}
                </Text>
              </View>
              <Text style={[Fonts.style.small, AppStyles.containerTiny]}>
                {'only few seats left' || '-'}
              </Text>
            </View>
            <View style={AppStyles.flex1}>
              <View style={AppStyles.row}>
                <Fontisto
                  name="map-marker-alt"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
                <Text style={[AppStyles.smallMarginLeft, Fonts.style.medium3]}>
                  {item.location && userLocation
                    ? `${ConvertDistance(
                        getDistance(userLocation, item.location),
                        1000,
                      )} km`
                    : item.distance || '-'}
                </Text>
              </View>
              <Text style={[Fonts.style.small, AppStyles.containerTiny]}>
                {'4 min'}
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

        <TouchableHighlight
          disabled={!currentUser}
          underlayColor={Colors.highlightUnderlay}
          onPress={() =>
            navigation.navigate('OnlineUsersScreen', {item, onlineUsers})
          }
          style={styles.btnSave}>
          <Text style={[Fonts.style.xl]}>
            {`${I18n.t('online')}: ${onlineUsers.length}`}
          </Text>
        </TouchableHighlight>

        <FlatList
          data={posts}
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
    ...AppStyles.container,
    ...AppStyles.containerBottom,
    ...AppStyles.sectionMargin,
    ...AppStyles.sectionVerticalBase,
    ...AppStyles.alignCenter,
    ...AppStyles.border7,
    ...AppStyles.borderImage,
    ...AppStyles.darkShadow,
  },
});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  userLocation: state.session.userLocation,
  favoriteIds: state.session.favoriteIds,
});

const mapDispatchToProps = dispatch => ({
  addFavoriteRequest: (data, callback) =>
    dispatch(FavoriteActions.addFavoriteRequest(data, callback)),
  removeFavoriteRequest: (data, callback) =>
    dispatch(FavoriteActions.removeFavoriteRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaceScreen);
