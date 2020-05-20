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

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale, GetUserCoordinate} from '../../Transforms';

import CustomImage from '../../Components/CustomImage';
import Loader from '../../Components/Loader';
import {DropDownHolder} from '../../Components/DropDownHolder';
import CustomHeader from '../../Components/CustomHeader';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

export class AddPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      placeId: null,
      imagePlaces: [],
      placeName: '',
      placeCategories: '',
      placeStatus: '',
      placeDescription: '',
      placeLocation: null,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;

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
        placeCategories: item.categories.join(', ') || '',
        placeStatus: item.status || '',
        placeDescription: item.description || '',
        placeLocation: item.location || null,
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
    } = this.state;
    const {savePlaceRequest} = this.props;

    if (
      imagePlaces.length < 1 ||
      placeName.length < 1 ||
      placeDescription.length < 1 ||
      placeStatus.length < 1 ||
      placeCategories.length < 1 ||
      !placeLocation
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
      categories: placeCategories.split(','),
      location: placeLocation,
    };

    console.tron.log({data});

    savePlaceRequest(data, this.savePlaceCallback);
  };

  savePlaceCallback = result => {
    if (result.ok) {
      console.tron.log({result});
    }
    this.setState({isLoading: false});
    this.props.navigation.pop();
  };

  renderImagePlaces() {
    const {imagePlaces} = this.state;
    console.tron.log({imagePlaces});

    return (
      <View>
        {imagePlaces.map(img => (
          <CustomImage
            key={img.modificationDate}
            source={{uri: img.path || img.uri}}
            style={{
              ...AppStyles.containerBottom,
              ...AppStyles.borderImage,
              ...AppStyles.border5,
              ...AppStyles.darkShadowSmall,
              height: Metrics.images.xl,
              width: '100%',
            }}
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
            <IconUserDefault
              width={Metrics.images.xl}
              height={Metrics.images.xl - Metrics.doubleBaseMargin}
            />
            <AntDesign
              name="pluscircle"
              size={Metrics.icons.large}
              color={Colors.baseText}
              style={{...AppStyles.btnIcon, position: 'absolute'}}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  getUserPosition = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            console.tron.log({position});
            this.setState({placeLocation: position.coords});
          },
          error => {
            console.tron.error({error});
            throw error;
          },
        );
      } else {
        console.tron.error({error: 'permission'});
        DropDownHolder.alert('error', I18n.t('permissionDenied'), undefined);
      }
    } catch (error) {
      console.tron.error({error});
      DropDownHolder.alert(
        'error',
        I18n.t('errorDefault'),
        error.message || I18n.t('tryAgain'),
      );
    }
    /**
     * TODO
     * dunno why this isn't worked
     */
    // try {
    //   const coords = await GetUserCoordinate();
    //   console.tron.log({getUserPosition: coords});
    //   this.setState({userPosition: coords});
    // } catch (error) {
    //   console.tron.error({error});
    //   DropDownHolder.alert(
    //     'error',
    //     I18n.t('errorDefault'),
    //     error.message || I18n.t('tryAgain'),
    //   );
    // }
  };

  render() {
    const {navigation, currentUser} = this.props;
    const {
      placeName,
      placeCategories,
      placeStatus,
      placeDescription,
      placeLocation,
      isLoading,
    } = this.state;

    return (
      <ScrollView>
        <CustomHeader onBack={() => navigation.pop()} />
        <View style={[AppStyles.container, AppStyles.section]}>
          {this.renderImagePlaces()}
          <TextInput
            value={placeName}
            placeholder={I18n.t('placeName')}
            onChangeText={text => this.setState({placeName: text})}
            style={[
              AppStyles.borderBottom7,
              Fonts.style.medium,
              Fonts.style.alignBottom,
            ]}
          />
          <TextInput
            value={placeCategories}
            placeholder={I18n.t('placeCategories')}
            onChangeText={text => this.setState({placeCategories: text})}
            style={[
              AppStyles.borderBottom7,
              Fonts.style.medium,
              Fonts.style.alignBottom,
            ]}
          />
          <TextInput
            value={placeStatus}
            placeholder={I18n.t('placeStatus')}
            onChangeText={text => this.setState({placeStatus: text})}
            style={[
              AppStyles.borderBottom7,
              Fonts.style.medium,
              Fonts.style.alignBottom,
            ]}
          />
          <TextInput
            value={placeDescription}
            multiline={true}
            numberOfLines={3}
            placeholder={I18n.t('placeDescription')}
            onChangeText={text => this.setState({placeDescription: text})}
            style={[
              AppStyles.borderBottom7,
              Fonts.style.medium,
              Fonts.style.alignBottom,
            ]}
          />
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

          {isLoading ? (
            <Loader style={[AppStyles.topSpace, AppStyles.bottomSpace]} />
          ) : (
            <TouchableHighlight
              underlayColor={Colors.highlightUnderlay}
              onPress={this.onSavePress}
              style={[
                AppStyles.topSpace,
                AppStyles.bottomSpace,
                AppStyles.sectionVerticalBase,
                AppStyles.alignCenter,
                AppStyles.border7,
                AppStyles.borderImage,
                AppStyles.darkShadowSmall,
              ]}>
              <Text style={[Fonts.style.xl]}>{I18n.t('save')}</Text>
            </TouchableHighlight>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  savePlaceRequest: (data, callback) =>
    dispatch(PlaceActions.savePlaceRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPlaceScreen);
