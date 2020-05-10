import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';
// Wrap FastImage with react-native-image-progress.
const Image = createImageProgress(FastImage);

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';
import {Scale} from '../Transforms';

const CustomImage = props => {
  const {children, source, style, imageStyle, imageBorderRadius} = props;

  return (
    <Image
      source={source}
      style={style}
      imageStyle={{
        ...imageStyle,
        borderRadius: imageBorderRadius,
      }}
    />
  );
};

CustomImage.propTypes = {
  source: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  imageStyle: PropTypes.object,
  imageBorderRadius: PropTypes.number,
};

CustomImage.defaultProps = {
  style: {},
  imageStyle: {},
};

export default CustomImage;
