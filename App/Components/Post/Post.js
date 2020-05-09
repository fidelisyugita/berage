import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale, DateFormatter} from '../../Transforms';

import CustomImage from '../../Components/CustomImage';

const Place = props => {
  const {children, item, onPress} = props;

  return (
    <View
      style={[
        AppStyles.smallMarginVertical,
        AppStyles.section,
        AppStyles.sectionVerticalSmall,
        AppStyles.shadow,
      ]}>
      <View style={[AppStyles.row, AppStyles.alignCenter]}>
        <CustomImage
          source={{uri: item.image}}
          style={[
            AppStyles.avatarMedium,
            AppStyles.borderCircle,
            AppStyles.border3,
          ]}
          imageBorderRadius={Metrics.circleRadius}
        />
        <View style={[AppStyles.baseMarginLeft, AppStyles.justifyEvenly]}>
          <Text style={Fonts.style.medium3}>{item.name || '-'}</Text>
          <Text style={Fonts.style.tiny}>
            {DateFormatter(item.updatedAt, null, 'MMMM D [at] h:mm A')}
          </Text>
        </View>
      </View>

      <View style={[AppStyles.sectionVerticalSmall, AppStyles.borderBottom5]}>
        <Text
          numberOfLines={5}
          style={[Fonts.style.medium, Fonts.style.alignJustify]}>
          {item.text || '-'}
        </Text>
      </View>

      <View style={[AppStyles.sectionVerticalSmall, AppStyles.row]}>
        <View style={[AppStyles.row, AppStyles.flex1]}>
          <View style={[AppStyles.alignCenter]}>
            <Icon
              name={item.isLiked ? 'thumb-up' : 'thumb-up-outline'}
              size={Metrics.icons.tiny}
              color={Colors.baseText}
            />
            <Text style={[Fonts.style.small]}>{item.totalLike}</Text>
          </View>
          <View style={[AppStyles.alignCenter, AppStyles.baseMarginLeft]}>
            <Icon
              name={item.isDisliked ? 'thumb-down' : 'thumb-down-outline'}
              size={Metrics.icons.tiny}
              color={Colors.baseText}
            />
            <Text style={[Fonts.style.small]}>{item.totalDislike}</Text>
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
