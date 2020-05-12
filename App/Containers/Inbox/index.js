import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import RenderInbox from '../../Components/Inbox/Inbox';

import {chats} from '../Dummy';

export default class InboxScreen extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <ScrollView>
        <View
          style={[
            AppStyles.section,
            AppStyles.sectionVertical,
            AppStyles.shadow,
          ]}>
          <Text style={Fonts.style.xxl3}>{I18n.t('inbox')}</Text>
        </View>

        <FlatList
          data={chats}
          keyExtractor={(item, idx) => `inbox-${idx}`}
          renderItem={({item}) => (
            <RenderInbox
              item={item}
              onPress={() => console.tron.log('pressed')}
            />
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
