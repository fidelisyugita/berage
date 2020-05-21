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
    <View style={[containerStyle]}>
      {(title || message) && (
        <View style={[AppStyles.section]}>
          <Text style={[Fonts.style.xxxl]}>{title}</Text>
          <Text style={[Fonts.style.large]}>{message}</Text>
        </View>
      )}
      <CustomImage
        source={imageSource}
        style={[AppStyles.alignSelfCenter, imageStyle]}
      />
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
