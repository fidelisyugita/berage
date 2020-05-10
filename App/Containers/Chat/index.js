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

import Room from '../../Components/Chat/Room';

import {chats} from '../Dummy';

export default class ChatScreen extends Component {
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
          <Text style={Fonts.style.xxl3}>{I18n.t('chat')}</Text>
        </View>

        <FlatList
          data={chats}
          keyExtractor={(item, idx) => `chat-${idx}`}
          renderItem={({item}) => (
            <Room item={item} onPress={() => console.tron.log('pressed')} />
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
