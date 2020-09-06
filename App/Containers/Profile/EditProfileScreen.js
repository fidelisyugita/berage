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
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import UserActions from '../../Redux/UserRedux';
import SessionActions from '../../Redux/SessionRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';
import {GetUserCoordinate, UploadImage, DeleteImage} from '../../Lib';

import CustomImage from '../../Components/CustomImage';
import Loader from '../../Components/Loader';
import {DropDownHolder} from '../../Components/DropDownHolder';
import CustomHeader from '../../Components/CustomHeader';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

export class EditProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      displayName: props.currentUser.displayName,
      photoURL: props.currentUser.photoURL,
      photoPath: props.currentUser.photoPath,
    };
  }

  onBack = async () => {
    const {navigation, currentUser} = this.props;

    // this.onSavePress();
    // setTimeout(() => navigation.pop(), 1000);

    navigation.pop();
  };

  changePhoto = async () => {
    const {currentUser} = this.props;
    const {photoPath} = this.state;

    console.log(currentUser);

    try {
      const image = await UploadImage(
        `users/${currentUser.uid || currentUser.id}`,
        Scale(480),
        Scale(480),
      );
      if (photoPath) await DeleteImage(photoPath);
      this.setState(
        {photoURL: image.uri, photoPath: image.refPath},
        this.onSavePress,
      );
    } catch (error) {
      console.tron.log({error});
    }
  };

  onSavePress = () => {
    const {displayName, photoURL, photoPath} = this.state;
    const {saveUserRequest} = this.props;

    // if (displayName.length < 1) {
    //   DropDownHolder.alert('warn', I18n.t('fieldsRequired'), undefined);
    //   return;
    // }

    this.setState({isLoading: true});

    const data = {
      displayName,
      photoURL,
      photoPath,
    };

    console.tron.log({data});

    saveUserRequest(data);
  };

  render() {
    const {navigation, currentUser} = this.props;
    const {displayName, photoURL} = this.state;

    console.log('photoURL');
    console.log(photoURL);

    return (
      <SafeAreaView>
        <ScrollView>
          <CustomHeader onBack={this.onBack} />
          <View style={[AppStyles.container, AppStyles.section]}>
            <View style={[AppStyles.row]}>
              <TouchableOpacity
                style={[AppStyles.alignCenter]}
                onPress={this.changePhoto}>
                {photoURL ? (
                  <CustomImage
                    source={{uri: photoURL}}
                    style={[
                      AppStyles.avatarXl,
                      AppStyles.borderCircle,
                      AppStyles.border3,
                    ]}
                    imageStyle={AppStyles.borderCircle}
                  />
                ) : (
                  <IconUserDefault
                    width={Metrics.avatars.xl}
                    height={Metrics.avatars.xl}
                  />
                )}
                <Text
                  style={[
                    Fonts.style.medium,
                    Fonts.style.linkColor,
                    {padding: Scale(8), paddingBottom: 0},
                  ]}>
                  {I18n.t('edit')}
                </Text>
              </TouchableOpacity>
              <View
                style={[
                  AppStyles.justifyCenter,
                  {marginLeft: Scale(15), bottom: Scale(15)},
                ]}>
                <Text style={[Fonts.style.medium]}>
                  {I18n.t('editProfileDetail')}
                </Text>
              </View>
            </View>
            <TextInput
              value={displayName}
              placeholder={I18n.t('personalName')}
              onChangeText={text => this.setState({displayName: text})}
              onEndEditing={this.onSavePress}
              style={styles.inputText}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  inputText: {
    ...AppStyles.borderBottom7,
    ...Fonts.style.medium,
    ...Fonts.style.alignBottom,
    minHeight: Scale(30),
    marginTop: Scale(10),
  },
});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  userLocation: state.session.userLocation,
});

const mapDispatchToProps = dispatch => ({
  saveUserRequest: (data, callback) =>
    dispatch(UserActions.saveUserRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfileScreen);
