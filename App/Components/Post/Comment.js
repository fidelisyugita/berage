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

const Comment = props => {
  const {children, item, onPress, disabled} = props;
  const user = item.updatedBy;
  const avatar = (user && user.photoURL) || item.photoURL;
  const name = (user && user.displayName) || item.displayName;
  // console.tron.log({item});

  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      underlayColor={Colors.highlightUnderlay}
      style={[AppStyles.section, AppStyles.sectionVerticalBase]}>
      <View style={[AppStyles.row]}>
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
          style={[AppStyles.row, AppStyles.baseMarginLeft, AppStyles.flex1]}>
          <View style={[AppStyles.flex1]}>
            <Text>
              <Text numberOfLines={1} style={Fonts.style.medium3}>
                {`${name || '-'} `}
              </Text>
              <Text numberOfLines={1} style={Fonts.style.medium}>
                {item.text || '-'}
              </Text>
            </Text>
            <Text style={[Fonts.style.tiny, AppStyles.containerSmall]}>
              {DateFormatter(item.updatedAt)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

Comment.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Comment.defaultProps = {
  style: {},
  disabled: false,
};

export default Comment;
