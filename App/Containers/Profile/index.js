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
            AppStyles.sectionMargin,
            AppStyles.sectionVerticalDouble,
            AppStyles.row,
            AppStyles.alignCenter,
            AppStyles.borderBottom5,
          ]}>
          <View style={[AppStyles.flex1]}>
            <Text numberOfLines={1} style={Fonts.style.xxl3}>
              {'Fidelis Yugita'}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.performSearch('pencil')}>
              <Text style={[Fonts.style.medium]}>
                {I18n.t('viewEditProfile')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={AppStyles.baseMarginLeft}>
            {loggedInUser && loggedInUser.image ? (
              <CustomImage
                source={{uri: loggedInUser.image}}
                style={[AppStyles.avatarXl]}
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
