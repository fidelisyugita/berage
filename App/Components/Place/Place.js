import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

const Place = props => {
  const {children, item, onPress} = props;

  return (
    <TouchableOpacity
      style={[AppStyles.sectionVerticalSmall, AppStyles.row]}
      onPress={onPress}>
      <FastImage
        style={{
          width: Scale(120),
          height: Metrics.images.tiny,
          borderRadius: Metrics.imageRadius,
        }}
        source={{
          uri: item.image,
        }}
      />
      <View style={[AppStyles.baseMarginLeft, AppStyles.justifyEvenly]}>
        <Text style={Fonts.style.medium3}>{item.name || '-'}</Text>
        <Text style={Fonts.style.medium}>{item.status || '-'}</Text>
        <Text style={Fonts.style.medium}>{item.distance || '-'}</Text>
      </View>
    </TouchableOpacity>
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
