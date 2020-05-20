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
} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

import PlaceActions from '../../Redux/PlaceRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

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
      imagePlaces: [],
      placeName: '',
      placeDesc: '',
      placeCategories: '',
    };
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
    const {imagePlaces, placeName, placeDesc, placeCategories} = this.state;
    const {savePlaceRequest} = this.props;

    this.setState({isLoading: true});

    const images = imagePlaces.map(img => img.uri);
    const data = {
      images,
      name: placeName,
      description: placeDesc,
      categories: placeCategories.split(','),
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

    return (
      <View>
        {imagePlaces.map(img => (
          <CustomImage
            key={img.modificationDate}
            source={{uri: img.path}}
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

  render() {
    const {navigation, currentUser} = this.props;
    const {placeName, placeDesc, placeCategories, isLoading} = this.state;

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
            value={placeDesc}
            multiline={true}
            numberOfLines={3}
            placeholder={I18n.t('placeDesc')}
            onChangeText={text => this.setState({placeDesc: text})}
            style={[
              AppStyles.borderBottom7,
              Fonts.style.medium,
              Fonts.style.alignBottom,
            ]}
          />

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
