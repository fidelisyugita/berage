import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

import {Colors, Fonts, Metrics, Images, ApplicationStyles} from '../Themes';
import I18n from '../I18n';
import {Scale} from '../Transforms';

const SavedPlace = props => {
  const {children, item, onPress} = props;

  return (
    <View style={ApplicationStyles.screen.section}>
      <TouchableOpacity onPress={onPress} style={ApplicationStyles.screen.card}>
        <Swiper
          height={Scale(200)}
          autoplay={true}
          loop={true}
          showsButtons={false}
          showsPagination={true}>
          {item.images.map(image => (
            <View>
              <FastImage
                style={{
                  width: '100%',
                  height: Scale(160),
                  borderTopLeftRadius: Metrics.imageRadius,
                  borderTopRightRadius: Metrics.imageRadius,
                }}
                source={{
                  uri: image,
                }}
              />
            </View>
          ))}
        </Swiper>
        <View
          style={{
            ...ApplicationStyles.screen.section,
            marginTop: 0,
            bottom: Metrics.marginVertical,
          }}>
          <Text style={Fonts.style.medium3}>{item.name || '-'}</Text>
          <Text style={Fonts.style.medium}>{item.categories.join(', ')}</Text>
          <Text style={Fonts.style.medium}>{item.distance || '-'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

SavedPlace.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

SavedPlace.defaultProps = {
  style: {},
};

export default SavedPlace;
