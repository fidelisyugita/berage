import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';

import moment from 'moment';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';
import {Scale, DateFormatter} from '../Utils';

const Loader = props => {
  const {children, style, size, color} = props;

  return (
    <View style={[AppStyles.alignCenter, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

Loader.propTypes = {
  style: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.string,
};

Loader.defaultProps = {
  style: {},
  size: 'large',
  color: Colors.baseText,
};

export default Loader;
