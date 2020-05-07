import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';
import {Scale} from '../Transforms';

const ThumbnailImages = props => {
  const {
    children,
    images,
    containerStyle,
    image1Style,
    image2Style,
    image3Style,
  } = props;

  /**
   * TODO
   * - add default if images is null
   */

  return (
    <View style={[AppStyles.row, containerStyle]}>
      <FastImage
        style={[
          {
            height: Metrics.images.large,
          },
          AppStyles.flex2,
          image1Style,
        ]}
        source={{uri: images[0]}}
      />
      {images[1] && images[2] && (
        <View style={[AppStyles.tinyMarginLeft, AppStyles.flex1]}>
          <FastImage
            style={[AppStyles.flex1, image2Style]}
            source={{uri: images[1]}}
          />
          <View style={{height: Scale(1)}} />
          <FastImage
            style={[AppStyles.flex1, image3Style]}
            source={{uri: images[2]}}
          />
        </View>
      )}
    </View>
  );
};

ThumbnailImages.propTypes = {
  images: PropTypes.array.isRequired,
  containerStyle: PropTypes.object,
  image1Style: PropTypes.object,
  image2Style: PropTypes.object,
  image3Style: PropTypes.object,
};

ThumbnailImages.defaultProps = {
  style: {},
};

export default ThumbnailImages;
