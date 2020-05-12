import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';

import moment from 'moment';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale, DateFormatter} from '../../Transforms';

import CustomImage from '../CustomImage';

const Room = props => {
  const {children, item, onPress} = props;

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={Colors.highlightUnderlay}
      style={[AppStyles.section]}>
      <View style={[AppStyles.row, AppStyles.alignCenter]}>
        <CustomImage
          source={{uri: item.image}}
          style={[
            AppStyles.border3,
            AppStyles.avatarMedium,
            AppStyles.borderCircle,
          ]}
          imageBorderRadius={Metrics.circleRadius}
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
              {DateFormatter(item.updatedAt)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

Room.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

Room.defaultProps = {
  style: {},
};

export default Room;
