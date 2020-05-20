import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Text, View, Modal} from 'react-native';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';

import CustomImage from './CustomImage';

const EmptyState = props => {
  const {
    children,
    containerStyle,
    imageSource,
    imageStyle,
    title,
    message,
  } = props;

  return (
    <View style={[AppStyles.alignCenter, containerStyle]}>
      {(title || message) && (
        <View
          style={[
            AppStyles.containerBottom,
            AppStyles.section,
            AppStyles.alignCenter,
          ]}>
          <Text style={[Fonts.style.xxxl, Fonts.style.alignLeft]}>{title}</Text>
          <Text style={[Fonts.style.large, Fonts.style.alignLeft]}>
            {message}
          </Text>
        </View>
      )}
      <CustomImage source={imageSource} style={imageStyle} />
      {children}
    </View>
  );
};

EmptyState.propTypes = {
  containerStyle: PropTypes.any,
  imageSource: PropTypes.any.isRequired,
  imageStyle: PropTypes.any,
  title: PropTypes.string,
  message: PropTypes.string,
};

EmptyState.defaultProps = {
  containerStyle: {
    backgroundColor: Colors.background,
  },
  imageSource: Images.loader,
  imageStyle: {
    width: Metrics.images.xl,
    height: Metrics.images.xl,
  },
};

export default EmptyState;
