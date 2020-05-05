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
import FastImage from 'react-native-fast-image';

import {Colors, Fonts, Metrics, Images, ApplicationStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import OverviewPlaces from '../../Components/OverviewPlaces';
import Place from '../../Components/Place';

const images = [
  'https://ak1.picdn.net/shutterstock/videos/22497541/thumb/1.jpg',
  'https://www.francescodazzi.com/img/s/v-10/p2544718669-3.jpg',
  'https://cdn.i-scmp.com/sites/default/files/d8/images/2019/06/24/61efb454-672b-11e9-a2c3-042d2f2c8874_image_hires_143424_0.jpg',
];

const items = [
  {
    name: 'VidelTeknik',
    image:
      'https://i1.wp.com/digital-photography-school.com/wp-content/uploads/2016/06/Rachel-Korinek-Food-Photographer-DPS-Hero-Angle-12.jpg',
    status: 'Open',
    distance: '1 km',
    categories: ['Workshop', 'Machine'],
  },
  {
    name: 'Dapoer Fezdaf',
    image:
      'https://previews.123rf.com/images/dndavis/dndavis1410/dndavis141000039/33021440-delicious-street-food-of-barbecued-lamb-shish-kebabs-on-the-streets-of-guilin-guangxi-autonomous-reg.jpg',
    status: 'Closed',
    distance: '1 km',
    categories: ['Food', 'Drink', 'Music'],
  },
  {
    name: 'Tarsius',
    image:
      'https://thumbs.dreamstime.com/b/photo-steak-brussel-sprout-will-be-great-menus-advertisements-other-places-where-food-photography-needed-129217121.jpg',
    status: 'Open',
    distance: '2 km',
    categories: ['Food', 'Drink'],
  },
];

export default class ExploreScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={ApplicationStyles.screen.section}>
          <View
            style={{
              backgroundColor: Colors.snow,
              borderRadius: Metrics.circleRadius,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: Metrics.marginHorizontal,
            }}>
            <Icon
              name="magnifier"
              size={Metrics.icons.tiny}
              color={Colors.text}
            />
            <TextInput
              style={{
                ...Fonts.style.medium,
                flex: 1,
                marginLeft: Metrics.smallMargin,
              }}
              placeholder={I18n.t('searchPlaceholder')}
            />
          </View>
        </View>

        <View
          style={{
            ...ApplicationStyles.screen.container,
            // width: Scale(300), //make the image smaller
          }}>
          <Swiper
            // width={Scale(375)} //but swiper bigger
            height={Scale(200)}
            autoplay={true}
            loop={true}
            showsButtons={false}
            showsPagination={false}>
            {images.map(image => (
              <View
                style={
                  {
                    //   marginRight: Metrics.marginHorizontal,
                  }
                }>
                <FastImage
                  style={{
                    width: '100%',
                    height: Scale(200),
                  }}
                  source={{
                    uri: image,
                  }}
                />
              </View>
            ))}
          </Swiper>
        </View>

        <OverviewPlaces
          title={I18n.t('popular')}
          onPress={() => console.tron.log({clicked: 'OverviewPlaces popular'})}>
          <FlatList
            data={items}
            keyExtractor={(item, idx) => `pop-${idx}`}
            style={{marginBottom: Metrics.smallMargin}}
            renderItem={({item}) => (
              <Place
                item={item}
                onPress={() => console.tron.log({clicked: 'true'})}
              />
            )}
          />
        </OverviewPlaces>

        <OverviewPlaces
          title={I18n.t('recommended')}
          onPress={() =>
            console.tron.log({clicked: 'OverviewPlaces recommended'})
          }>
          <FlatList
            data={items}
            keyExtractor={(item, idx) => `rec-${idx}`}
            style={{marginBottom: Metrics.doubleBaseMargin}}
            renderItem={({item}) => (
              <Place
                item={item}
                onPress={() => console.tron.log({clicked: 'recommended'})}
              />
            )}
          />
        </OverviewPlaces>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
