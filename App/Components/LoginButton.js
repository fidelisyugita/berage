import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Text, View, TouchableHighlight} from 'react-native';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';

import CustomImage from './CustomImage';

const LoginButton = props => {
  const {children, containerStyle, textStyle, onPress, text} = props;

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={Colors.highlightUnderlay}
      style={[
        AppStyles.section,
        AppStyles.sectionVerticalBase,
        AppStyles.sectionMargin,
        AppStyles.border3,
        AppStyles.borderImage,
        AppStyles.shadow,
        containerStyle,
      ]}>
      <Text style={[Fonts.style.large, Fonts.style.linkColor, textStyle]}>
        {text}
      </Text>
    </TouchableHighlight>
  );
};

LoginButton.propTypes = {
  containerStyle: PropTypes.any,
  textStyle: PropTypes.any,
  onPress: PropTypes.func,
  text: PropTypes.string,
};

LoginButton.defaultProps = {
  containerStyle: {
    alignSelf: 'flex-start',
  },
  textStyle: {},
  text: I18n.t('login'),
};

export default LoginButton;
