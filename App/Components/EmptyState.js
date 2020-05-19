import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Text, View, Modal} from 'react-native';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';

import CustomImage from './CustomImage';

const EmptyState = props => {
  const {children, containerStyle, imageSource, title, message} = props;

  return (
    <View style={[AppStyles.alignCenter, containerStyle]}>
      <CustomImage
        source={imageSource}
        style={{
          width: Metrics.images.xl,
          height: Metrics.images.xl,
        }}
      />
      {title && message && (
        <View
          style={[
            AppStyles.containerBottom,
            AppStyles.section,
            AppStyles.alignCenter,
          ]}>
          <Text style={[Fonts.style.xxxl, Fonts.style.alignCenter]}>
            {title}
          </Text>
          <Text style={[Fonts.style.large, Fonts.style.alignCenter]}>
            {message}
          </Text>
        </View>
      )}
    </View>
  );
};

EmptyState.propTypes = {
  containerStyle: PropTypes.object,
  imageSource: PropTypes.object.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};

EmptyState.defaultProps = {
  containerStyle: {
    backgroundColor: Colors.background,
  },
  imageSource: Images.loader,
};

export default EmptyState;
