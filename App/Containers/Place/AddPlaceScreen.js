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

import AuthActions from '../../Redux/AuthRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import CustomImage from '../../Components/CustomImage';
import {DropDownHolder} from '../../Components/DropDownHolder';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

export class AddPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      imagePlaces: [],
      placeName: '',
      placeDesc: '',
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
      const refPath = `place/${image.modificationDate}.jpg`;
      const reference = storage().ref(refPath);
      const uploadResponse = await reference.putFile(image.path);
      console.tron.log({uploadResponse});
      const url = await storage()
        .ref(refPath)
        .getDownloadURL();
      console.tron.log({url});

      tempImages.push({...image, url: url});
      this.setState({
        imagePlaces: tempImages,
      });
    } catch (error) {
      console.tron.log({error});
      DropDownHolder.alert('error', error, undefined);
    }
  };

  onSubmit = () => {
    const {imagePlaces, placeName, placeDesc} = this.state;
    console.tron.log('submitted');
  };

  googleLoginCallback = result => {
    if (result.ok) {
      console.tron.log({result});
    }
    this.setState({isLoading: false});
  };

  renderImagePlaces() {
    const {imagePlaces} = this.state;

    return (
      <View>
        {imagePlaces.map(img => (
          <CustomImage
            source={{uri: img.path}}
            style={{
              ...AppStyles.containerBottom,
              ...AppStyles.borderImage,
              ...AppStyles.border5,
              height: Metrics.images.xl,
              width: '100%',
            }}
            imageBorderRadius={Metrics.imageRadius}
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
            AppStyles.border5,
          ]}>
          <View>
            <IconUserDefault
              width={Metrics.images.xl}
              height={Metrics.images.xl}
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
    const {placeName, placeDesc} = this.state;

    return (
      <ScrollView>
        <View style={[AppStyles.row, AppStyles.justifyBetween]}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={[AppStyles.btnIcon]}>
            <AntDesign
              name="arrowleft"
              size={Metrics.icons.tiny}
              color={Colors.baseText}
            />
          </TouchableOpacity>
        </View>
        <View style={[AppStyles.container, AppStyles.section]}>
          {this.renderImagePlaces()}
          <TextInput
            value={placeName}
            placeholder={I18n.t('placeName')}
            onChangeText={text => this.setState({placeName: text})}
            style={[AppStyles.borderBottom7, Fonts.style.medium]}
          />
          <TextInput
            value={placeDesc}
            placeholder={I18n.t('placeDesc')}
            onChangeText={text => this.setState({placeDesc: text})}
            style={[AppStyles.borderBottom7, Fonts.style.medium]}
          />
          <TouchableHighlight
            underlayColor={Colors.highlightUnderlay}
            onPress={this.onSubmit}
            style={[
              AppStyles.topSpace,
              AppStyles.bottomSpace,
              AppStyles.sectionVerticalBase,
              AppStyles.alignCenter,
              AppStyles.border7,
              AppStyles.borderImage,
            ]}>
            <Text style={[Fonts.style.xl]}>{I18n.t('submit')}</Text>
          </TouchableHighlight>
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
  loginWithGoogleRequest: (data, callback) =>
    dispatch(AuthActions.loginWithGoogleRequest(data, callback)),
  logoutRequest: () => dispatch(AuthActions.logoutRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPlaceScreen);
