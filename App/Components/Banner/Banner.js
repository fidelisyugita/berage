import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';

import moment from 'moment';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';
import {DateFormatter} from '../../Lib';

import CustomImage from '../CustomImage';

const Banner = props => {
  const {children, item, onPress, onDeletePress} = props;

  console.tron.log({item});

  return (
    <View style={[AppStyles.section]}>
      <View style={[AppStyles.sectionVertical, AppStyles.borderTop5]}>
        <View style={[AppStyles.row]}>
          <CustomImage
            source={{
              uri: item.image && item.image.uri ? item.image.uri : item.image,
            }}
            style={[
              AppStyles.border3,
              AppStyles.avatarMedium,
              AppStyles.borderCircle,
            ]}
            imageStyle={AppStyles.borderCircle}
          />
          <View style={[AppStyles.baseMarginLeft, AppStyles.flex1]}>
            <View style={[AppStyles.row]}>
              <Text style={[Fonts.style.medium3, AppStyles.flex1]}>
                {item.title || '-'}
              </Text>
              <Text style={Fonts.style.small}>
                {DateFormatter(item.updatedAt, 'MMMM D [at] h:mm A')}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              style={[Fonts.style.medium, Fonts.style.alignJustify]}>
              {item.description || '-'}
            </Text>
          </View>
        </View>

        {/* <View style={AppStyles.container}>
          <CustomImage
            source={{uri: item.image}}
            style={{
              ...AppStyles.border3,
              ...AppStyles.borderImage,
              height: Metrics.images.large,
              width: '100%',
            }}
            imageStyle={AppStyles.borderImage}
          />
        </View> */}
      </View>

      <View
        style={
          {
            // ...AppStyles.section,
            // ...AppStyles.sectionVerticalBase,
            // ...AppStyles.shadow,
          }
        }>
        <CustomImage
          source={{
            uri: item.image && item.image.uri ? item.image.uri : item.image,
          }}
          style={{
            ...AppStyles.border3,
            ...AppStyles.borderImage,
            height: Metrics.images.large,
            width: '100%',
          }}
          imageStyle={AppStyles.borderImage}
        />
        <View
          style={{
            ...AppStyles.section,
            ...AppStyles.sectionVerticalBase,
            ...AppStyles.borderImage,
            backgroundColor: Colors.tempHomeLoader,
          }}>
          <TouchableHighlight
            underlayColor={Colors.highlightUnderlay}
            onPress={onDeletePress}
            style={{
              ...AppStyles.sectionVerticalBase,
              ...AppStyles.alignCenter,
              ...AppStyles.border7,
              ...AppStyles.borderImage,
              ...AppStyles.shadow,
              width: '100%',
            }}>
            <Text style={[Fonts.style.large]}>{I18n.t('delete')}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

Banner.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  onDeletePress: PropTypes.func.isRequired,
};

Banner.defaultProps = {
  style: {},
};

export default Banner;
