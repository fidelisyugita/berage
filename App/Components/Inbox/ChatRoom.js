import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

const ChatRoom = props => {
  const {children, item, onPress} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      underlayColor={Colors.steel}
      style={[AppStyles.section]}>
      <View style={[AppStyles.row, AppStyles.alignCenter]}>
        <FastImage
          style={{
            width: Metrics.avatars.medium,
            height: Metrics.avatars.medium,
            borderRadius: Metrics.circleRadius,
          }}
          source={{uri: item.image}}
        />
        <View
          style={[
            AppStyles.sectionVertical,
            AppStyles.row,
            AppStyles.baseMarginLeft,
            AppStyles.flex1,
            AppStyles.borderTop5,
          ]}>
          <View style={[AppStyles.justifyEvenly, AppStyles.flex1]}>
            <Text numberOfLines={1} style={Fonts.style.medium3}>
              {item.name || '-'}
            </Text>
            <Text numberOfLines={1} style={Fonts.style.medium}>
              {item.lastConversation}
            </Text>
          </View>
          <View style={AppStyles.baseMarginLeft}>
            <Text style={Fonts.style.small}>
              {moment(item.updatedAt, 'YYYY-MM-DD hh:mm:ss').fromNow()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ChatRoom.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

ChatRoom.defaultProps = {
  style: {},
};

export default ChatRoom;
