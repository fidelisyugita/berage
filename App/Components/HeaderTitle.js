import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';

const HeaderTitle = props => {
  const {children, containerStyle, title, shadow} = props;

  return (
    <View
      style={[
        AppStyles.section,
        AppStyles.sectionVertical,
        shadow ? AppStyles.shadow : {},
        containerStyle,
      ]}>
      {title && <Text style={Fonts.style.xxl3}>{title}</Text>}
      {children}
    </View>
  );
};

HeaderTitle.propTypes = {
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  shadow: PropTypes.bool,
};

HeaderTitle.defaultProps = {
  containerStyle: {},
};

export default HeaderTitle;
