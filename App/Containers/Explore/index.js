import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import OverviewPlaces from '../../Components/Place/OverviewPlaces';
import CustomImage from '../../Components/CustomImage';

import {images, items} from '../Dummy';

export default class ExploreScreen extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <ScrollView>
        <View style={[AppStyles.container, AppStyles.section]}>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: Metrics.circleRadius,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: Metrics.marginHorizontal,
            }}>
            <Icon
              name="magnifier"
              size={Metrics.icons.tiny}
              color={Colors.placeholder}
            />
            <TextInput
              style={[
                Fonts.style.medium,
                AppStyles.smallMarginLeft,
                AppStyles.flex1,
              ]}
              placeholder={I18n.t('searchPlaceholder')}
            />
          </View>
        </View>

        <View
          style={{
            ...AppStyles.container,
            // width: Scale(300), //make the image smaller
          }}>
          <Swiper
            // width={Scale(375)} //but swiper bigger
            height={Metrics.images.xl + Metrics.baseMargin}
            autoplay={true}
            loop={true}
            showsButtons={false}
            showsPagination={true}>
            {images.map(image => (
              // <View
              //   key={image}
              //   style={
              //     {
              //       //   marginRight: Metrics.marginHorizontal,
              //     }
              //   }>
                <CustomImage
                  key={image}
                  source={{uri: image}}
                  style={{
                    ...AppStyles.border3,
                    width: '100%',
                    height: Metrics.images.xl,
                  }}
                />
              // </View>
            ))}
          </Swiper>
        </View>

        <OverviewPlaces
          title={I18n.t('popular')}
          items={items}
          onPress={() => console.tron.log({clicked: 'See all'})}
          navigation={navigation}
        />

        <OverviewPlaces
          title={I18n.t('recommended')}
          items={items}
          onPress={() => console.tron.log({clicked: 'See all'})}
          navigation={navigation}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
