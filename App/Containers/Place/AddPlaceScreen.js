/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Geolocation from 'react-native-geolocation-service';

import PlaceActions from '../../Redux/PlaceRedux';
import SessionActions from '../../Redux/SessionRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale, GetUserCoordinate} from '../../Utils';

import CustomImage from '../../Components/CustomImage';
import Loader from '../../Components/Loader';
import {DropDownHolder} from '../../Components/DropDownHolder';
import CustomHeader from '../../Components/CustomHeader';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

const CATEGORIES_DATA = [
  'Food',
  'Drink',
  'Live Music',
  'Barbershop',
  'Workshop',
  'Mechanic',
  'Service',
  'Nearby City',
];

const STATUS_DATA = ['Open', 'Closed'];

const MAX_CATEGORY = 5;

export class AddPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      placeId: null,
      imagePlaces: [],
      placeName: '',
      placeCategories: [],
      placeStatus: STATUS_DATA[0],
      placeDescription: '',
      placeLocation: props.userLocation || null,
      minPrice: 0,
      maxPrice: 0,
    };
  }

  componentDidMount() {
    const {navigation, userLocation} = this.props;

    const item = navigation.getParam('item', null);
    console.tron.log({item});
    if (item) {
      this.setState({
        placeId: item.id || null,
        imagePlaces:
          item.images.map(img => {
            console.tron.log({img});
            return {uri: img};
          }) || [],
        placeName: item.name || '',
        placeCategories: item.categories || [],
        placeStatus: item.status || STATUS_DATA[0],
        placeDescription: item.description || '',
        placeLocation: item.location || userLocation,
        minPrice: item.minPrice || 0,
        maxPrice: item.maxPrice || 0,
      });
    }
  }

  addImage = async () => {
    let tempImages = [...this.state.imagePlaces];

    try {
      const image = await ImagePicker.openPicker({
        width: 720,
        height: 480,
        cropping: true,
      });
      console.tron.log({image});

      /**
       * TODO
       * - make it better and move it
       */
      const refPath = `places/${image.modificationDate}.jpg`;
      const reference = storage().ref(refPath);
      const uploadResponse = await reference.putFile(image.path);
      console.tron.log({uploadResponse});

      /**
       * TODO
       * - make sure token doesn't bother image to show
       */
      const url = await storage()
        .ref(refPath)
        .getDownloadURL();

      tempImages.push({...image, uri: url.split('&token')[0]});
      console.tron.log({tempImages});
      this.setState({
        imagePlaces: tempImages,
      });
    } catch (error) {
      console.tron.log({error});
      console.tron.log({error: error.message});
      DropDownHolder.alert(
        'error',
        I18n.t('errorDefault'),
        error.message || I18n.t('tryAgain'),
      );
    }
  };

  onSavePress = () => {
    const {
      placeId,
      imagePlaces,
      placeName,
      placeCategories,
      placeStatus,
      placeDescription,
      placeLocation,
      minPrice,
      maxPrice,
    } = this.state;
    const {savePlaceRequest} = this.props;

    if (
      imagePlaces.length < 1 ||
      placeName.length < 1 ||
      placeDescription.length < 1 ||
      placeStatus.length < 1 ||
      placeCategories.length < 1 ||
      !placeLocation ||
      minPrice === 0 ||
      maxPrice < minPrice
    ) {
      DropDownHolder.alert('warn', I18n.t('fieldsRequired'), undefined);
      return;
    }

    this.setState({isLoading: true});

    const images = imagePlaces.map(img => img.uri);
    const data = {
      id: placeId,
      images,
      name: placeName,
      description: placeDescription,
      status: placeStatus,
      categories: placeCategories,
      location: placeLocation,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };

    console.tron.log({data});

    savePlaceRequest(data, this.savePlaceCallback);
  };

  savePlaceCallback = result => {
    this.setState({isLoading: false});
    if (result.ok) {
      console.tron.log({result});
      this.props.navigation.pop();
      if (this.state.placeId) this.props.navigation.pop();
    }
  };

  renderImagePlaces() {
    const {imagePlaces} = this.state;
    // console.tron.log({imagePlaces});

    return (
      <View>
        {imagePlaces.map(img => (
          <CustomImage
            key={img.modificationDate}
            source={{uri: img.path || img.uri}}
            style={styles.inputImage}
            imageStyle={AppStyles.borderImage}
          />
        ))}
        <TouchableHighlight
          underlayColor={Colors.highlightUnderlay}
          onPress={this.addImage}
          style={[
            AppStyles.containerBottom,
            AppStyles.sectionVerticalBase,
            AppStyles.alignCenter,
            AppStyles.borderImage,
            AppStyles.border7,
            AppStyles.darkShadowSmall,
          ]}>
          <View>
            {/* <IconUserDefault
              width={Metrics.images.xl}
              height={Metrics.images.xl - Metrics.doubleBaseMargin}
            /> */}
            <CustomImage source={Images.homeLoader} style={AppStyles.imageXl} />
            <AntDesign
              name="pluscircle"
              size={Metrics.icons.xl}
              color={Colors.border}
              style={{
                ...AppStyles.btnIcon,
                position: 'absolute',
                left: Scale(140),
                top: Scale(140),
              }}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  getUserPosition = async () => {
    try {
      const coords = await GetUserCoordinate();
      console.tron.log({getUserPosition: coords});
      this.setState({placeLocation: coords});
      this.props.saveUserLocation(coords);
    } catch (error) {
      console.tron.error({error});
      DropDownHolder.alert(
        'error',
        error.message || I18n.t('errorDefault'),
        I18n.t('needLocationAccess'),
      );
    }
  };

  addCategories(item) {
    let tempCategories = [...this.state.placeCategories];

    const indexItem = tempCategories.indexOf(item);
    console.tron.log({indexItem});

    if (indexItem < 0) {
      if (tempCategories.length < MAX_CATEGORY) tempCategories.push(item);
    } else tempCategories.splice(indexItem, 1);
    console.tron.log({tempCategories});

    this.setState({placeCategories: tempCategories});
  }

  onChangeNumber(id, text) {
    console.tron.log({text});
    if (text === '') this.setState({[id]: 0}); // remember this
    const value = parseFloat(text);
    if (!isNaN(value)) {
      console.tron.log({value});
      this.setState({[id]: value}, () => console.tron.log(this.state[id]));
    }
  }

  render() {
    const {navigation, currentUser} = this.props;
    const {
      placeName,
      placeCategories,
      placeStatus,
      placeDescription,
      placeLocation,
      isLoading,
      minPrice,
      maxPrice,
    } = this.state;

    return (
      <ScrollView>
        <CustomHeader onBack={() => navigation.pop()} />
        <View style={[AppStyles.container, AppStyles.section]}>
          {this.renderImagePlaces()}
          <TextInput
            value={placeName}
            placeholder={I18n.t('name')}
            onChangeText={text => this.setState({placeName: text})}
            style={styles.inputText}
          />
          <TextInput
            value={placeDescription}
            multiline={true}
            numberOfLines={3}
            placeholder={I18n.t('description')}
            onChangeText={text => this.setState({placeDescription: text})}
            style={styles.inputText}
          />

          <TextInput
            editable={false}
            placeholder={`${I18n.t('categories')} (${I18n.t(
              'max',
            )} ${MAX_CATEGORY})`}
            onChangeText={text => this.setState({placeCategories: text})}
            style={{...styles.inputText, borderColor: Colors.transparent}}
          />
          <FlatList
            data={CATEGORIES_DATA}
            keyExtractor={(item, idx) => item + idx}
            numColumns={2}
            renderItem={({item}) => (
              <TouchableHighlight
                underlayColor={Colors.highlightUnderlay}
                onPress={() => this.addCategories(item)}
                style={{
                  ...styles.radioBtn,
                  backgroundColor: placeCategories.includes(item)
                    ? Colors.border
                    : Colors.silver,
                }}>
                <Text numberOfLines={1} style={[Fonts.style.medium]}>
                  {item}
                </Text>
              </TouchableHighlight>
            )}
          />
          <TextInput
            editable={false}
            placeholder={I18n.t('status')}
            onChangeText={text => this.setState({placeStatus: text})}
            style={{...styles.inputText, borderColor: Colors.transparent}}
          />
          <FlatList
            data={STATUS_DATA}
            keyExtractor={(item, idx) => item + idx}
            numColumns={2}
            renderItem={({item}) => (
              <TouchableHighlight
                underlayColor={Colors.highlightUnderlay}
                onPress={() => this.setState({placeStatus: item})}
                style={{
                  ...styles.radioBtn,
                  backgroundColor:
                    placeStatus === item ? Colors.border : Colors.silver,
                }}>
                <Text numberOfLines={1} style={[Fonts.style.medium]}>
                  {item}
                </Text>
              </TouchableHighlight>
            )}
          />

          <TextInput
            editable={false}
            placeholder={I18n.t('priceDetail')}
            style={{...styles.inputText, borderColor: Colors.transparent}}
          />
          <View style={[AppStyles.row]}>
            <TextInput
              value={minPrice.toString()}
              keyboardType="number-pad"
              placeholder={I18n.t('from')}
              onChangeText={text => this.onChangeNumber('minPrice', text)}
              style={{
                ...styles.inputText,
                ...AppStyles.flex1,
                ...Fonts.style.alignVerticalCenter,
              }}
            />
            <Text
              style={[
                Fonts.style.medium3,
                Fonts.style.alignVerticalCenter,
                AppStyles.section,
              ]}>
              -
            </Text>
            <TextInput
              value={maxPrice.toString()}
              keyboardType="number-pad"
              placeholder={I18n.t('to')}
              onChangeText={text => this.onChangeNumber('maxPrice', text)}
              style={{
                ...styles.inputText,
                ...AppStyles.flex1,
                ...Fonts.style.alignVerticalCenter,
              }}
            />
          </View>

          {!placeLocation && (
            <TouchableHighlight
              underlayColor={Colors.highlightUnderlay}
              onPress={this.getUserPosition}
              disabled={placeLocation}
              style={[
                AppStyles.topSpace,
                AppStyles.bottomSpace,
                AppStyles.sectionVerticalBase,
                AppStyles.alignCenter,
                AppStyles.border7,
                AppStyles.borderImage,
                AppStyles.darkShadowSmall,
                placeLocation ? {backgroundColor: Colors.border} : {},
              ]}>
              <Text
                style={[
                  Fonts.style.large,
                  placeLocation ? {color: Colors.white} : {},
                ]}>
                {placeLocation ? I18n.t('saved') : I18n.t('setPlaceCoordinate')}
              </Text>
            </TouchableHighlight>
          )}

          {isLoading ? (
            <Loader style={[AppStyles.topSpace, AppStyles.bottomSpace]} />
          ) : (
            <TouchableHighlight
              underlayColor={Colors.highlightUnderlay}
              onPress={this.onSavePress}
              style={styles.btnSave}>
              <Text style={[Fonts.style.xl]}>{I18n.t('save')}</Text>
            </TouchableHighlight>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputImage: {
    ...AppStyles.containerBottom,
    ...AppStyles.borderImage,
    ...AppStyles.border5,
    ...AppStyles.darkShadowSmall,
    height: Metrics.images.xl,
    width: '100%',
  },
  inputText: {
    ...AppStyles.borderBottom7,
    ...Fonts.style.medium,
    ...Fonts.style.alignBottom,
  },
  btnSave: {
    ...AppStyles.topSpace,
    ...AppStyles.bottomSpace,
    ...AppStyles.sectionVerticalBase,
    ...AppStyles.alignCenter,
    ...AppStyles.border7,
    ...AppStyles.borderImage,
    ...AppStyles.darkShadowSmall,
  },
  radioBtn: {
    ...AppStyles.flex1,
    ...AppStyles.section,
    ...AppStyles.sectionMargin,
    ...AppStyles.sectionVerticalBase,
    ...AppStyles.smallMarginVertical,
    ...AppStyles.border7,
    ...AppStyles.borderImage,
    ...AppStyles.shadow,
  },
});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  userLocation: state.session.userLocation,
});

const mapDispatchToProps = dispatch => ({
  savePlaceRequest: (data, callback) =>
    dispatch(PlaceActions.savePlaceRequest(data, callback)),
  saveUserLocation: data => dispatch(SessionActions.saveUserLocation(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPlaceScreen);
