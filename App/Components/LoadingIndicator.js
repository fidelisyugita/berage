import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';

import moment from 'moment';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';
import {Scale, DateFormatter} from '../Transforms';

const LoadingIndicator = props => {
  const {children, size, color} = props;

  return (
    <View style={[AppStyles.alignCenter]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

LoadingIndicator.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

LoadingIndicator.defaultProps = {
  size: 'large',
  color: Colors.baseText,
};

export default LoadingIndicator;
