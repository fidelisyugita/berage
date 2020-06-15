import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';

import moment from 'moment';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';
import {DateFormatter} from '../../Lib';

import CustomImage from '../CustomImage';

const Room = props => {
  const {children, item, onPress, disabled} = props;
  const {user} = item;
  const avatar = (user && user.avatar) || item.photoURL;
  const name = (user && user.name) || item.displayName;
  // console.tron.log({item});

  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      underlayColor={Colors.highlightUnderlay}
      style={[AppStyles.section]}>
      <View style={[AppStyles.row, AppStyles.alignCenter]}>
        <CustomImage
          source={{uri: avatar || null}}
          style={[
            AppStyles.border3,
            AppStyles.avatarMedium,
            AppStyles.borderCircle,
          ]}
          imageStyle={AppStyles.borderCircle}
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
              {name || '-'}
            </Text>
            <Text numberOfLines={1} style={Fonts.style.medium}>
              {item.text || '-'}
              {/* {`${I18n.t('joinAt')} ${DateFormatter(item.timestamp)}`} */}
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
  disabled: PropTypes.bool,
};

Room.defaultProps = {
  style: {},
  disabled: false,
};

export default Room;
