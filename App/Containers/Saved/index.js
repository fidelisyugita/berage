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

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import SavedPlace from '../../Components/Place/SavedPlace';

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
    images: [
      'https://i1.wp.com/digital-photography-school.com/wp-content/uploads/2016/06/Rachel-Korinek-Food-Photographer-DPS-Hero-Angle-12.jpg',
      ...images,
    ],
    isLiked: true,
  },
  {
    name: 'Kohvi',
    image:
      'https://www.cancer.org/latest-news/coffee-and-cancer-what-the-research-really-shows/_jcr_content/par/textimage/image.img.jpg/1522697270446.jpg',
    status: 'Open',
    distance: '1 km',
    categories: ['Food', 'Drink'],
    images: [
      'https://www.cancer.org/latest-news/coffee-and-cancer-what-the-research-really-shows/_jcr_content/par/textimage/image.img.jpg/1522697270446.jpg',
      ...images,
    ],
    isLiked: true,
  },
  {
    name: 'Dapoer Fezdaf',
    image:
      'https://previews.123rf.com/images/dndavis/dndavis1410/dndavis141000039/33021440-delicious-street-food-of-barbecued-lamb-shish-kebabs-on-the-streets-of-guilin-guangxi-autonomous-reg.jpg',
    status: 'Closed',
    distance: '1 km',
    categories: ['Food', 'Drink', 'Music'],
    images: [
      'https://previews.123rf.com/images/dndavis/dndavis1410/dndavis141000039/33021440-delicious-street-food-of-barbecued-lamb-shish-kebabs-on-the-streets-of-guilin-guangxi-autonomous-reg.jpg',
      ...images,
    ],
  },
  {
    name: 'Tarsius',
    image:
      'https://thumbs.dreamstime.com/b/photo-steak-brussel-sprout-will-be-great-menus-advertisements-other-places-where-food-photography-needed-129217121.jpg',
    status: 'Open',
    distance: '2 km',
    categories: ['Food', 'Drink'],
    images: [
      'https://thumbs.dreamstime.com/b/photo-steak-brussel-sprout-will-be-great-menus-advertisements-other-places-where-food-photography-needed-129217121.jpg',
      ...images,
    ],
  },
];

export default class SavedScreen extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <ScrollView>
        <View style={[AppStyles.container, AppStyles.section]}>
          <Text style={Fonts.style.xl3}>{I18n.t('saved')}</Text>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item, idx) => `saved-${idx}`}
          style={{marginBottom: Metrics.doubleBaseMargin}}
          renderItem={({item}) => (
            <SavedPlace
              item={item}
              onPress={() => navigation.navigate('PlaceScreen', {item})}
            />
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
