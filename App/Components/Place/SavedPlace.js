import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Text, View} from 'react-native';
import {getDistance} from 'geolib';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';
import {ConvertDistance} from '../../Lib';

import ThumbnailImages from '../ThumbnailImages';

const SavedPlace = props => {
  const {children, item, onPress, userLocation} = props;

  return (
    <View style={[AppStyles.section]}>
      <TouchableHighlight
        onPress={onPress}
        underlayColor={Colors.highlightUnderlay}
        style={[
          AppStyles.border3,
          AppStyles.borderImage,
          AppStyles.shadow,
          AppStyles.baseMarginVertical,
        ]}>
        <View>
          <ThumbnailImages
            images={item.images}
            image1Style={
              item.images.length < 3
                ? {
                    borderTopLeftRadius: Metrics.imageRadius,
                    borderTopRightRadius: Metrics.imageRadius,
                  }
                : {borderTopLeftRadius: Metrics.imageRadius}
            }
            image2Style={{borderTopRightRadius: Metrics.imageRadius}}
          />

          <View style={[AppStyles.section, AppStyles.sectionVertical]}>
            <Text style={Fonts.style.medium3}>{item.name || '-'}</Text>
            <Text style={Fonts.style.small}>{item.categories.join(', ')}</Text>
            <Text style={Fonts.style.small}>
              {item.location && userLocation
                ? `${ConvertDistance(
                    getDistance(userLocation, item.location),
                    1000,
                  )} km`
                : item.distance || '-'}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

SavedPlace.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  userLocation: PropTypes.object,
};

SavedPlace.defaultProps = {
  style: {},
  userLocation: null,
};

export default SavedPlace;
