import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Colors, Fonts, Metrics, Images, ApplicationStyles} from '../Themes';
import I18n from '../I18n';
import {Scale} from '../Transforms';

const Place = props => {
  const {children, item, onPress} = props;

  return (
    // <View style={ApplicationStyles.screen.section}>
    <TouchableOpacity
      style={{flexDirection: 'row', marginTop: Metrics.baseMargin}}
      onPress={onPress}>
      <FastImage
        style={{
          width: Scale(120),
          height: Scale(80),
        }}
        source={{
          uri: item.image,
        }}
      />
      <View
        style={{
          justifyContent: 'space-around',
          marginLeft: Metrics.baseMargin,
        }}>
        <Text style={Fonts.style.medium}>{item.name || '-'}</Text>
        <Text style={Fonts.style.medium}>{item.status || '-'}</Text>
        <Text style={Fonts.style.medium}>{item.distance || '-'}</Text>
      </View>
    </TouchableOpacity>
    // </View>
  );
};

Place.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

Place.defaultProps = {
  style: {},
};

export default Place;
