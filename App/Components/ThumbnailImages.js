import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View} from 'react-native';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';
import {Scale} from '../Utils';

import CustomImage from './CustomImage';

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
      <CustomImage
        source={{uri: images[0]}}
        style={[
          {
            height: Metrics.images.large,
          },
          AppStyles.flex2,
          AppStyles.border3,
          image1Style,
        ]}
        imageStyle={[AppStyles.flex2, image1Style]}
      />
      {images[1] && images[2] && (
        <View style={[AppStyles.tinyMarginLeft, AppStyles.flex1]}>
          <CustomImage
            source={{uri: images[1]}}
            style={[AppStyles.flex1, image2Style, AppStyles.border3]}
            imageStyle={[AppStyles.flex1, image2Style]}
          />
          <View style={{height: Scale(1)}} />
          <CustomImage
            source={{uri: images[2]}}
            style={[AppStyles.flex1, image3Style, AppStyles.border3]}
            imageStyle={[AppStyles.flex1, image3Style]}
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
  containerStyle: {},
  image1Style: {},
  image2Style: {},
  image3Style: {},
};

export default ThumbnailImages;
