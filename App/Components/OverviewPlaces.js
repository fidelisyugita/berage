import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View} from 'react-native';

import {Colors, Fonts, Metrics, Images, ApplicationStyles} from '../Themes';
import I18n from '../I18n';

const OverviewPlaces = props => {
  const {children, title, onPress} = props;

  return (
    <View style={ApplicationStyles.screen.section}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={Fonts.style.large3}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={Fonts.style.large3}>{I18n.t('seeAll')}</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

OverviewPlaces.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

OverviewPlaces.defaultProps = {
  style: {},
};

export default OverviewPlaces;
