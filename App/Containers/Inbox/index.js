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

import RenderInbox from '../../Components/Inbox/Inbox';
import HeaderTitle from '../../Components/HeaderTitle';

import {chats} from '../Dummy';

export default class InboxScreen extends Component {
  render() {
    const {navigation} = this.props;
    const sections = [
      {
        title: I18n.t('inbox'),
        data: chats,
      },
    ];

    return (
      <SectionList
        sections={sections}
        keyExtractor={(item, idx) => item + idx}
        renderSectionHeader={({section: {title}}) => (
          <HeaderTitle title={title} shadow={true} />
        )}
        renderItem={({item}) => (
          <RenderInbox
            item={item}
            onPress={() => console.tron.log('pressed')}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({});
