import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  SectionList,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import Room from '../../Components/Chat/Room';
import HeaderTitle from '../../Components/HeaderTitle';

import {chats} from '../Dummy';

export default class ChatScreen extends Component {
  render() {
    const {navigation} = this.props;
    const sections = [
      {
        title: I18n.t('chat'),
        data: chats,
      },
    ];

    return (
      <SectionList
        sections={sections}
        keyExtractor={(item, idx) => item + idx}
        renderSectionHeader={({section: {title}}) => (
          <HeaderTitle title={title} shadow />
        )}
        renderItem={({item}) => (
          <Room
            item={item}
            onPress={() => navigation.navigate('ChatScreen', {user: item})}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({});
