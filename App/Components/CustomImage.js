import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';
// Wrap FastImage with react-native-image-progress.
const Image = createImageProgress(FastImage);

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';
import {Scale} from '../Utils';

const CustomImage = props => {
  const {children, source, style, imageStyle} = props;

  return <Image source={source} style={style} imageStyle={imageStyle} />;
};

CustomImage.propTypes = {
  source: PropTypes.any.isRequired,
  style: PropTypes.any.isRequired,
  imageStyle: PropTypes.any,
};

CustomImage.defaultProps = {
  style: {
    height: Metrics.images.xl,
    width: '100%',
  },
  imageStyle: {
    borderRadius: 0,
  },
};

export default CustomImage;
