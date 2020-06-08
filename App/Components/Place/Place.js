import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View} from 'react-native';
import {getDistance} from 'geolib';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';
import {ConvertDistance} from '../../Lib';

import CustomImage from '../CustomImage';

const Place = props => {
  const {children, item, onPress, userLocation} = props;
  console.tron.log({item});
  const image =
    item.images && item.images.length > 0 && item.images[0].uri
      ? item.images[0].uri
      : item.images[0];

  return (
    <TouchableOpacity
      style={[AppStyles.sectionVerticalSmall, AppStyles.row]}
      onPress={onPress}>
      <CustomImage
        source={{uri: image}}
        style={{
          ...AppStyles.borderImage,
          ...AppStyles.border3,
          width: Scale(120),
          height: Metrics.images.tiny,
        }}
        imageStyle={AppStyles.borderImage}
      />
      <View style={[AppStyles.baseMarginLeft, AppStyles.justifyEvenly]}>
        <Text style={Fonts.style.medium3}>{item.name || '-'}</Text>
        <Text style={Fonts.style.medium}>
          {item.categories.slice(0, 2).join(', ')}
        </Text>
        <Text style={Fonts.style.medium}>
          {item.location && userLocation
            ? `${ConvertDistance(
                getDistance(userLocation, item.location),
                1000,
              )} km`
            : item.distance || '-'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Place.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  userLocation: PropTypes.object,
};

Place.defaultProps = {
  style: {},
  userLocation: null,
};

export default Place;
