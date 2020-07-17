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

const Inbox = props => {
  const {children, item, onPress} = props;

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={Colors.highlightUnderlay}
      style={[AppStyles.section]}>
      <View style={[AppStyles.sectionVertical, AppStyles.borderTop5]}>
        <View style={[AppStyles.row]}>
          <CustomImage
            source={{
              uri: item.image && item.image.uri ? item.image.uri : item.image,
            }}
            style={[
              AppStyles.border3,
              AppStyles.avatarMedium,
              AppStyles.borderCircle,
            ]}
            imageStyle={AppStyles.borderCircle}
          />
          <View style={[AppStyles.baseMarginLeft, AppStyles.flex1]}>
            <View style={[AppStyles.row]}>
              <Text style={[Fonts.style.medium3, AppStyles.flex1]}>
                {item.title || '-'}
              </Text>
              <Text style={Fonts.style.small}>
                {DateFormatter(item.updatedAt, 'MMMM D [at] h:mm A')}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              style={[Fonts.style.medium, Fonts.style.alignJustify]}>
              {item.description || '-'}
            </Text>
          </View>
        </View>

        <View style={AppStyles.sectionVertical}>
          <CustomImage
            source={{
              uri: item.image && item.image.uri ? item.image.uri : item.image,
            }}
            style={{
              ...AppStyles.border3,
              ...AppStyles.borderImage,
              height: Metrics.images.xxl,
              width: '100%',
            }}
            imageStyle={AppStyles.borderImage}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

Inbox.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

Inbox.defaultProps = {
  style: {},
};

export default Inbox;
