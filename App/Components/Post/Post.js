import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';
import {DateFormatter} from '../../Lib';

import CustomImage from '../../Components/CustomImage';

const Place = props => {
  const {children, item, onPress} = props;
  const {updatedBy} = item;
  const image = item.image && item.image.uri ? item.image.uri : item.image;

  return (
    <View
      style={[
        AppStyles.tinyMarginBottom,
        AppStyles.section,
        AppStyles.sectionVerticalBase,
        AppStyles.shadow,
      ]}>
      <View style={[AppStyles.row, AppStyles.alignCenter]}>
        <CustomImage
          source={{uri: updatedBy.photoURL}}
          style={[
            AppStyles.avatarMedium,
            AppStyles.borderCircle,
            AppStyles.border3,
          ]}
          imageStyle={AppStyles.borderCircle}
        />
        <View style={[AppStyles.baseMarginLeft, AppStyles.justifyEvenly]}>
          <Text
            numberOfLines={1}
            style={[Fonts.style.medium3, AppStyles.flex1]}>
            {updatedBy.displayName || '-'}
          </Text>
          <Text style={Fonts.style.tiny}>
            {DateFormatter(item.updatedAt, 'MMMM D [at] h:mm A')}
          </Text>
        </View>
      </View>

      <View style={[AppStyles.sectionVerticalSmall, AppStyles.borderBottom5]}>
        <Text
          numberOfLines={5}
          style={[Fonts.style.medium, Fonts.style.alignJustify]}>
          {item.text || '-'}
        </Text>
        {image && (
          <CustomImage
            source={{uri: image}}
            style={{
              ...AppStyles.borderImage,
              ...AppStyles.border5,
              ...AppStyles.baseMarginVertical,
              height: Metrics.screenWidth - Scale(30),
              width: Metrics.screenWidth - Scale(30),
            }}
            imageStyle={AppStyles.borderImage}
          />
        )}
      </View>

      <View style={[AppStyles.sectionVerticalSmall, AppStyles.row]}>
        <View style={[AppStyles.row, AppStyles.flex1]}>
          <View style={[AppStyles.alignCenter]}>
            <Icon
              name={item.isLiked ? 'thumb-up' : 'thumb-up-outline'}
              size={Metrics.icons.tiny}
              color={Colors.baseText}
            />
            <Text style={[Fonts.style.small]}>{item.totalLike || 0}</Text>
          </View>
          <View style={[AppStyles.alignCenter, AppStyles.baseMarginLeft]}>
            <Icon
              name={item.isDisliked ? 'thumb-down' : 'thumb-down-outline'}
              size={Metrics.icons.tiny}
              color={Colors.baseText}
            />
            <Text style={[Fonts.style.small]}>{item.totalDislike || 0}</Text>
          </View>
          <View style={[AppStyles.alignCenter, AppStyles.baseMarginLeft]}>
            <Icon
              name="share-outline"
              size={Metrics.icons.tiny}
              color={Colors.baseText}
            />
            <Text style={[Fonts.style.small]}>{I18n.t('share')}</Text>
          </View>
        </View>
        <View style={[AppStyles.alignCenter]}>
          <Icon
            name="comment-outline"
            size={Metrics.icons.tiny}
            color={Colors.baseText}
          />
          <Text style={[Fonts.style.small]}>{I18n.t('comment')}</Text>
        </View>
      </View>
    </View>
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
