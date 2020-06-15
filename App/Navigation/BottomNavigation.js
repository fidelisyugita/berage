import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';

import ExploreScreen from '../Containers/Explore';
import SavedScreen from '../Containers/Saved';
import RoomChatScreen from '../Containers/Chat';
import InboxScreen from '../Containers/Inbox';
import ProfileScreen from '../Containers/Profile';
import {Scale} from '../Transforms';

const BottomNav = createBottomTabNavigator(
  {
    Explore: {
      screen: ExploreScreen,
      navigationOptions: navigation => ({
        title: I18n.t('explore'),
        tabBarIcon: ({focused, tintColor}) => (
          <Icon name="magnifier" size={Metrics.icons.small} color={tintColor} />
        ),
      }),
    },
    Saved: {
      screen: SavedScreen,
      navigationOptions: navigation => ({
        title: I18n.t('saved'),
        tabBarIcon: ({focused, tintColor}) => (
          <Icon name="heart" size={Metrics.icons.small} color={tintColor} />
        ),
      }),
    },
    Chat: {
      screen: RoomChatScreen,
      navigationOptions: navigation => ({
        title: I18n.t('chat'),
        tabBarIcon: ({focused, tintColor}) => (
          <Icon name="bubble" size={Metrics.icons.small} color={tintColor} />
        ),
      }),
    },
    Inbox: {
      screen: InboxScreen,
      navigationOptions: navigation => ({
        title: I18n.t('inbox'),
        tabBarIcon: ({focused, tintColor}) => (
          <Icon name="envelope" size={Metrics.icons.small} color={tintColor} />
        ),
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: navigation => ({
        title: I18n.t('profile'),
        tabBarIcon: ({focused, tintColor}) => (
          <Icon name="user" size={Metrics.icons.small} color={tintColor} />
        ),
      }),
    },
  },
  {
    initialRouteName: 'Explore',
    tabBarOptions: {
      activeTintColor: Colors.facebook,
      labelStyle: {
        ...Fonts.style.small,
        top: -Scale(Metrics.smallMargin),
      },
      // iconStyle: {
      //   backgroundColor: Colors.baseText,
      // },
      // tabStyle: {
      //   backgroundColor: Colors.baseText,
      //   margin: 2,
      // },
      style: {
        height: Scale(50),
        // backgroundColor: Colors.baseText,
      },
    },
  },
);

export default BottomNav;
