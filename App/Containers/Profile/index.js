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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

import AuthActions from '../../Redux/AuthRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import CustomImage from '../../Components/CustomImage';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

import {chats} from '../Dummy';

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  onLoginPress = () => {
    const {loginWithGoogleRequest} = this.props;

    this.setState({isLoading: true});

    loginWithGoogleRequest(null, this.googleLoginCallback);
  };

  googleLoginCallback = result => {
    if (result.ok) {
      console.tron.log({result});
    }
    this.setState({isLoading: false});
  };

  render() {
    const {navigation, currentUser} = this.props;

    return (
      <ScrollView>
        <View
          style={[
            AppStyles.sectionMargin,
            AppStyles.sectionVerticalDouble,
            AppStyles.row,
            AppStyles.alignCenter,
            AppStyles.borderBottom5,
          ]}>
          <View style={[AppStyles.flex1]}>
            <Text numberOfLines={1} style={Fonts.style.xxl3}>
              {(currentUser && currentUser.displayName) ||
                I18n.t('personalName')}
            </Text>
            <TouchableOpacity onPress={this.onLoginPress}>
              <Text style={[Fonts.style.medium]}>
                {I18n.t('viewEditProfile')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={AppStyles.baseMarginLeft}>
            {currentUser && currentUser.photoURL ? (
              <CustomImage
                source={{uri: currentUser.photoURL}}
                style={[
                  AppStyles.avatarXl,
                  AppStyles.borderCircle,
                  AppStyles.border3,
                ]}
                imageBorderRadius={Metrics.circleRadius}
              />
            ) : (
              <IconUserDefault
                width={Metrics.avatars.xl}
                height={Metrics.avatars.xl}
              />
            )}
          </View>
        </View>

        <TouchableHighlight
          onPress={() => console.tron.log('pressed')}
          underlayColor={Colors.highlightUnderlay}
          style={AppStyles.section}>
          <View
            style={[
              AppStyles.row,
              AppStyles.sectionVertical,
              AppStyles.borderBottom5,
              AppStyles.alignCenter,
            ]}>
            <Text style={[Fonts.style.large, AppStyles.flex1]}>
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
          onPress={() => navigation.navigate('AddPlaceScreen')}
          underlayColor={Colors.highlightUnderlay}
          style={AppStyles.section}>
          <View
            style={[
              AppStyles.row,
              AppStyles.sectionVertical,
              AppStyles.borderBottom5,
              AppStyles.alignCenter,
            ]}>
            <Text style={[Fonts.style.large, AppStyles.flex1]}>
              {I18n.t('listYourSpace')}
            </Text>
            <Icon
              name="home-plus"
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
              AppStyles.sectionVertical,
              AppStyles.borderBottom5,
              AppStyles.alignCenter,
            ]}>
            <Text style={[Fonts.style.large, AppStyles.flex1]}>
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
              AppStyles.sectionVertical,
              AppStyles.borderBottom5,
              AppStyles.alignCenter,
            ]}>
            <Text style={[Fonts.style.large, AppStyles.flex1]}>
              {I18n.t('feedback')}
            </Text>
            <Icon
              name="card-text"
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
              AppStyles.sectionVertical,
              AppStyles.borderBottom5,
              AppStyles.alignCenter,
            ]}>
            <Text style={[Fonts.style.large, AppStyles.flex1]}>
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
          onPress={() => console.tron.log('pressed')}
          underlayColor={Colors.highlightUnderlay}
          style={AppStyles.section}>
          <View
            style={[
              AppStyles.row,
              AppStyles.sectionVertical,
              AppStyles.borderBottom5,
              AppStyles.alignCenter,
            ]}>
            <Text style={[Fonts.style.large, AppStyles.flex1]}>
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
          onPress={() => console.tron.log('pressed')}
          underlayColor={Colors.highlightUnderlay}
          style={AppStyles.section}>
          <View
            style={[
              AppStyles.row,
              AppStyles.sectionVertical,
              AppStyles.borderBottom5,
              AppStyles.alignCenter,
            ]}>
            <Text style={[Fonts.style.large, AppStyles.flex1]}>
              {I18n.t('logout')}
            </Text>
          </View>
        </TouchableHighlight>
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
)(ProfileScreen);
