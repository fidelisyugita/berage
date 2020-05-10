import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';

import SearchActions from '../../Redux/SearchRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import ChatRoom from '../../Components/Inbox/ChatRoom';
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
            <Text numberOfLines={1} style={Fonts.style.large3}>
              {'Fidelis Yugita'}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.performSearch('pencil')}>
              <Text style={[Fonts.style.small, Fonts.style.linkColor]}>
                {I18n.t('viewProfile')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={chats}
          keyExtractor={(item, idx) => `inbox-${idx}`}
          renderItem={({item}) => (
            <ChatRoom item={item} onPress={() => console.tron.log('pressed')} />
          )}
        />
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
