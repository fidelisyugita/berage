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
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

import SearchActions from '../../Redux/SearchRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import CustomImage from '../../Components/CustomImage';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

import {chats} from '../Dummy';

export class ProfileScreen extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  componentDidUpdate(prevProps, prevState) {
    const {results} = this.props;

    console.tron.log({results});
    console.tron.log({'prevProps.results': prevProps.results});
  }

  render() {
    const {navigation, loggedInUser} = this.props;

    return (
      <ScrollView>
        <View
          style={[
            AppStyles.section,
            AppStyles.sectionVertical,
            AppStyles.shadow,
            AppStyles.row,
            AppStyles.alignCenter,
          ]}>
          <View>
            {loggedInUser && loggedInUser.image ? (
              <CustomImage
                source={{uri: loggedInUser.image}}
                style={[AppStyles.avatarLarge]}
              />
            ) : (
              <IconUserDefault
                width={Metrics.avatars.large}
                height={Metrics.avatars.large}
              />
            )}
          </View>
          <View style={[AppStyles.baseMarginLeft]}>
            <Text numberOfLines={1} style={Fonts.style.xl3}>
              {'Fidelis Yugita'}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.performSearch('pencil')}>
              <Text style={[Fonts.style.medium, Fonts.style.linkColor]}>
                {I18n.t('viewProfile')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[AppStyles.section]}>
          <View style={[AppStyles.container]}>
            <Text style={[Fonts.style.small, Fonts.style.uppercase]}>
              {I18n.t('hosting')}
            </Text>
            <TouchableOpacity
              // onPress={onPress}
              underlayColor={Colors.highlightUnderlay}
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
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={onPress}
              underlayColor={Colors.highlightUnderlay}
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
            </TouchableOpacity>
          </View>

          <View style={[AppStyles.container]}>
            <Text style={[Fonts.style.small, Fonts.style.uppercase]}>
              {I18n.t('support')}
            </Text>
            <TouchableOpacity
              // onPress={onPress}
              underlayColor={Colors.highlightUnderlay}
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
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={onPress}
              underlayColor={Colors.highlightUnderlay}
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
            </TouchableOpacity>
          </View>

          <View style={[AppStyles.container]}>
            <Text style={[Fonts.style.small, Fonts.style.uppercase]}>
              {I18n.t('legal')}
            </Text>
            <TouchableOpacity
              // onPress={onPress}
              underlayColor={Colors.highlightUnderlay}
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
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={onPress}
              underlayColor={Colors.highlightUnderlay}
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
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={onPress}
              underlayColor={Colors.highlightUnderlay}
              style={[
                AppStyles.row,
                AppStyles.sectionVerticalBase,
                AppStyles.borderBottom5,
                AppStyles.alignCenter,
              ]}>
              <Text style={[Fonts.style.medium2, AppStyles.flex1]}>
                {I18n.t('logout')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  results: state.search.results,
  loggedInUser: state.session.loggedInUser,
});

const mapDispatchToProps = dispatch => ({
  // loginRequest: (data, callback) =>
  //   dispatch(UserActions.loginRequest(data, callback)),
  performSearch: data => dispatch(SearchActions.search(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
