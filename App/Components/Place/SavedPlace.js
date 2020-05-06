import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

const SavedPlace = props => {
  const {children, item, onPress} = props;

  return (
    <View style={[AppStyles.container, AppStyles.section]}>
      <TouchableHighlight
        onPress={onPress}
        underlayColor={Colors.steel}
        style={{zIndex: 1}}>
        <View style={[AppStyles.border3, AppStyles.borderImage]}>
          <Swiper
            height={Scale(200)}
            style={{zIndex: 2}}
            autoplay={true}
            loop={true}
            showsButtons={false}
            showsPagination={true}>
            {item.images.map(image => (
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
            ))}
          </Swiper>
          <View
            style={{
              ...AppStyles.section,
              bottom: Metrics.marginVertical,
            }}>
            <Text style={Fonts.style.medium3}>{item.name || '-'}</Text>
            <Text style={Fonts.style.medium}>{item.categories.join(', ')}</Text>
            <Text style={Fonts.style.medium}>{item.distance || '-'}</Text>
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
