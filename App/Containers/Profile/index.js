/* eslint-disable curly */
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
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

import AuthActions from '../../Redux/AuthRedux';
import FavoriteActions from '../../Redux/FavoriteRedux';
import PlaceActions from '../../Redux/PlaceRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import CustomImage from '../../Components/CustomImage';
import ModalLoader from '../../Components/Modal/ModalLoader';
import {DropDownHolder} from '../../Components/DropDownHolder';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {getUserPlacesRequest, myPlaces, currentUser} = this.props;

    if (currentUser && myPlaces.length < 1) getUserPlacesRequest();
  }

  onLoginPress = () => {
    const {loginWithGoogleRequest} = this.props;

    this.setState({isLoading: true});

    loginWithGoogleRequest(null, this.googleLoginCallback);
  };

  googleLoginCallback = result => {
    const {getFavoritesRequest, getUserPlacesRequest} = this.props;
    if (result.ok) {
      console.tron.log({result});
      getFavoritesRequest();
      getUserPlacesRequest();
    }
    this.setState({isLoading: false});
  };

  onLogoutPress = () => {
    const {logoutRequest} = this.props;
    logoutRequest();
  };

  onHostPress = () => {
    const {navigation, currentUser} = this.props;

    if (currentUser) {
      if (currentUser.availableHostLeft || currentUser.superUser)
        navigation.navigate('AddPlaceScreen');
      else
        DropDownHolder.alert(
          'warn',
          I18n.t('alreadyHostTitle'),
          I18n.t('alreadyHostMessage'),
        );
    } else DropDownHolder.alert('warn', I18n.t('loginFirst'), undefined);
  };

  render() {
    const {navigation, currentUser} = this.props;
    const {isLoading} = this.state;

    return (
      <ScrollView>
        <ModalLoader visible={isLoading} imageSource={Images.loader} />
        <View
          style={[
            AppStyles.section,
            AppStyles.sectionVerticalDouble,
            AppStyles.shadow,
            AppStyles.row,
            AppStyles.alignCenter,
          ]}>
          <View>
            {currentUser && currentUser.photoURL ? (
              <CustomImage
                source={{uri: currentUser.photoURL}}
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
          </View>
          <View style={[AppStyles.baseMarginLeft, AppStyles.flex1]}>
            <Text numberOfLines={1} style={Fonts.style.xxl3}>
              {(currentUser && currentUser.displayName) ||
                I18n.t('personalName')}
            </Text>
            <TouchableOpacity onPress={this.onLoginPress}>
              <Text style={[Fonts.style.medium, Fonts.style.linkColor]}>
                {currentUser ? I18n.t('viewProfile') : I18n.t('login')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {currentUser && currentUser.superUser && (
          <View style={[AppStyles.container]}>
            <Text
              style={[
                AppStyles.section,
                Fonts.style.small,
                Fonts.style.uppercase,
              ]}>
              {I18n.t('admin')}
            </Text>
            <TouchableHighlight
              onPress={() => navigation.navigate('SetBannerScreen')}
              underlayColor={Colors.highlightUnderlay}
              style={AppStyles.section}>
              <View
                style={[
                  AppStyles.row,
                  AppStyles.sectionVerticalBase,
                  AppStyles.borderBottom5,
                  AppStyles.alignCenter,
                ]}>
                <Text style={[Fonts.style.large2, AppStyles.flex1]}>
                  {I18n.t('setBanner')}
                </Text>
                <Icon
                  name="settings"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => navigation.navigate('setPopular')}
              underlayColor={Colors.highlightUnderlay}
              style={AppStyles.section}>
              <View
                style={[
                  AppStyles.row,
                  AppStyles.sectionVerticalBase,
                  AppStyles.borderBottom5,
                  AppStyles.alignCenter,
                ]}>
                <Text style={[Fonts.style.large2, AppStyles.flex1]}>
                  {I18n.t('setPopular')}
                </Text>
                <Icon
                  name="settings"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => navigation.navigate('setRecommended')}
              underlayColor={Colors.highlightUnderlay}
              style={AppStyles.section}>
              <View
                style={[
                  AppStyles.row,
                  AppStyles.sectionVerticalBase,
                  AppStyles.borderBottom5,
                  AppStyles.alignCenter,
                ]}>
                <Text style={[Fonts.style.large2, AppStyles.flex1]}>
                  {I18n.t('setRecommended')}
                </Text>
                <Icon
                  name="settings"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => navigation.navigate('SendNotifScreen')}
              underlayColor={Colors.highlightUnderlay}
              style={AppStyles.section}>
              <View
                style={[
                  AppStyles.row,
                  AppStyles.sectionVerticalBase,
                  AppStyles.borderBottom5,
                  AppStyles.alignCenter,
                ]}>
                <Text style={[Fonts.style.large2, AppStyles.flex1]}>
                  {I18n.t('sendNotif')}
                </Text>
                <Icon
                  name="settings"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
              </View>
            </TouchableHighlight>
          </View>
        )}

        <View style={[AppStyles.container]}>
          <Text
            style={[
              AppStyles.section,
              Fonts.style.small,
              Fonts.style.uppercase,
            ]}>
            {I18n.t('hosting')}
          </Text>
          <TouchableHighlight
            onPress={() => navigation.navigate('MyPlacesScreen')}
            underlayColor={Colors.highlightUnderlay}
            style={AppStyles.section}>
            <View
              style={[
                AppStyles.row,
                AppStyles.sectionVerticalBase,
                AppStyles.borderBottom5,
                AppStyles.alignCenter,
              ]}>
              <Text style={[Fonts.style.large2, AppStyles.flex1]}>
                {I18n.t('yourPlaces')}
              </Text>
              <Icon
                name="home"
                size={Metrics.icons.tiny}
                color={Colors.baseText}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.onHostPress}
            underlayColor={Colors.highlightUnderlay}
            style={AppStyles.section}>
            <View
              style={[
                AppStyles.row,
                AppStyles.sectionVerticalBase,
                AppStyles.borderBottom5,
                AppStyles.alignCenter,
              ]}>
              <Text style={[Fonts.style.large2, AppStyles.flex1]}>
                {I18n.t('listYourSpace')}
              </Text>
              <Icon
                name="home-plus"
                size={Metrics.icons.tiny}
                color={Colors.baseText}
              />
            </View>
          </TouchableHighlight>
        </View>

        <View style={[AppStyles.container]}>
          <Text
            style={[
              AppStyles.section,
              Fonts.style.small,
              Fonts.style.uppercase,
            ]}>
            {I18n.t('support')}
          </Text>
          <TouchableHighlight
            onPress={() => console.tron.log('pressed')}
            underlayColor={Colors.highlightUnderlay}
            style={AppStyles.section}>
            <View
              style={[
                AppStyles.row,
                AppStyles.sectionVerticalBase,
                AppStyles.borderBottom5,
                AppStyles.alignCenter,
              ]}>
              <Text style={[Fonts.style.large2, AppStyles.flex1]}>
                {I18n.t('help')}
              </Text>
              <Icon
                name="help"
                size={Metrics.icons.tiny}
                color={Colors.baseText}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => console.tron.log('pressed')}
            underlayColor={Colors.highlightUnderlay}
            style={AppStyles.section}>
            <View
              style={[
                AppStyles.row,
                AppStyles.sectionVerticalBase,
                AppStyles.borderBottom5,
                AppStyles.alignCenter,
              ]}>
              <Text style={[Fonts.style.large2, AppStyles.flex1]}>
                {I18n.t('feedback')}
              </Text>
              <Icon
                name="card-text"
                size={Metrics.icons.tiny}
                color={Colors.baseText}
              />
            </View>
          </TouchableHighlight>
        </View>

        <View style={[AppStyles.container]}>
          <Text
            style={[
              AppStyles.section,
              Fonts.style.small,
              Fonts.style.uppercase,
            ]}>
            {I18n.t('legal')}
          </Text>
          <TouchableHighlight
            onPress={() => navigation.navigate('TermsOfServiceScreen')}
            underlayColor={Colors.highlightUnderlay}
            style={AppStyles.section}>
            <View
              style={[
                AppStyles.row,
                AppStyles.sectionVerticalBase,
                AppStyles.borderBottom5,
                AppStyles.alignCenter,
              ]}>
              <Text style={[Fonts.style.large2, AppStyles.flex1]}>
                {I18n.t('termsOfService')}
              </Text>
              <Icon
                name="file-document"
                size={Metrics.icons.tiny}
                color={Colors.baseText}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}
            underlayColor={Colors.highlightUnderlay}
            style={AppStyles.section}>
            <View
              style={[
                AppStyles.row,
                AppStyles.sectionVerticalBase,
                AppStyles.borderBottom5,
                AppStyles.alignCenter,
              ]}>
              <Text style={[Fonts.style.large2, AppStyles.flex1]}>
                {I18n.t('privacyPolicy')}
              </Text>
              <Icon
                name="shield-key"
                size={Metrics.icons.tiny}
                color={Colors.baseText}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.onLogoutPress}
            underlayColor={Colors.highlightUnderlay}
            style={[AppStyles.section]}>
            <View
              style={[
                AppStyles.row,
                AppStyles.sectionVerticalBase,
                AppStyles.borderBottom5,
                AppStyles.alignCenter,
              ]}>
              <Text style={[Fonts.style.large, AppStyles.flex1]}>
                {I18n.t('logout')}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  myPlaces: state.place.myPlaces,
});

const mapDispatchToProps = dispatch => ({
  loginWithGoogleRequest: (data, callback) =>
    dispatch(AuthActions.loginWithGoogleRequest(data, callback)),
  logoutRequest: () => dispatch(AuthActions.logoutRequest()),
  getFavoritesRequest: (data, callback) =>
    dispatch(FavoriteActions.getFavoritesRequest(data, callback)),
  getUserPlacesRequest: (data, callback) =>
    dispatch(PlaceActions.getUserPlacesRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
