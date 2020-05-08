import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import ThumbnailImages from '../ThumbnailImages';

const SavedPlace = props => {
  const {children, item, onPress} = props;

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
            image1Style={{borderTopLeftRadius: Metrics.imageRadius}}
            image2Style={{borderTopRightRadius: Metrics.imageRadius}}
          />

          <View style={[AppStyles.section, AppStyles.sectionVertical]}>
            <Text style={Fonts.style.medium3}>{item.name || '-'}</Text>
            <Text style={Fonts.style.small}>{item.categories.join(', ')}</Text>
            <Text style={Fonts.style.small}>{item.distance || '-'}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

SavedPlace.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

SavedPlace.defaultProps = {
  style: {},
};

export default SavedPlace;
