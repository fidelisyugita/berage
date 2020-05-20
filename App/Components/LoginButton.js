import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Text, View, TouchableHighlight} from 'react-native';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';

import CustomImage from './CustomImage';

const LoginButton = props => {
  const {children, containerStyle, textStyle, onPress} = props;

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
        {I18n.t('login')}
      </Text>
    </TouchableHighlight>
  );
};

LoginButton.propTypes = {
  containerStyle: PropTypes.any,
  textStyle: PropTypes.any,
  onPress: PropTypes.func,
};

LoginButton.defaultProps = {
  containerStyle: {
    alignSelf: 'flex-start',
  },
  textStyle: {},
};

export default LoginButton;
