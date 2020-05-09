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

import ChatRoom from '../../Components/Inbox/ChatRoom';

const items = [
  {
    name: 'VidelTeknik',
    image:
      'https://i1.wp.com/digital-photography-school.com/wp-content/uploads/2016/06/Rachel-Korinek-Food-Photographer-DPS-Hero-Angle-12.jpg',
    status: 'Open',
    distance: '1 km',
    categories: ['Workshop', 'Machine'],
    isLiked: true,
    updatedAt: '2020-05-07 18:50:18',
    lastConversation:
      'Ea elit eu excepteur adipisicing ea sunt laborum reprehenderit ex et. Ut commodo officia proident nostrud amet ut ullamco ex anim nulla ut. Eiusmod elit velit sit ut commodo laborum esse sint adipisicing elit irure nisi deserunt irure. Consequat minim mollit enim Lorem cillum voluptate. Eiusmod mollit reprehenderit consectetur enim aliquip laborum consequat commodo anim laborum.',
  },
  {
    name: 'Fidelis Yugita',
    image:
      'https://www.cancer.org/latest-news/coffee-and-cancer-what-the-research-really-shows/_jcr_content/par/textimage/image.img.jpg/1522697270446.jpg',
    status: 'Open',
    distance: '1 km',
    categories: ['Food', 'Drink'],
    isLiked: true,
    updatedAt: '2020-05-07 17:50:18',
    lastConversation:
      'Magna est minim consectetur Lorem reprehenderit sunt est incididunt ex eu. Laborum consectetur excepteur est anim veniam adipisicing eiusmod aute veniam dolore anim labore eiusmod quis. Ut duis enim incididunt sit pariatur duis ipsum ut deserunt minim. Pariatur qui culpa magna aliquip amet.',
  },
  {
    name: 'Huzakerna',
    image:
      'https://previews.123rf.com/images/dndavis/dndavis1410/dndavis141000039/33021440-delicious-street-food-of-barbecued-lamb-shish-kebabs-on-the-streets-of-guilin-guangxi-autonomous-reg.jpg',
    status: 'Closed',
    distance: '1 km',
    categories: ['Food', 'Drink', 'Music'],
    updatedAt: '2020-05-06 08:50:18',
    lastConversation:
      'Aute occaecat veniam nulla aliqua excepteur fugiat qui exercitation commodo duis est mollit commodo veniam. Proident in voluptate sunt incididunt excepteur labore commodo consectetur sit proident est Lorem sint aute. Sunt voluptate exercitation pariatur culpa in. Velit minim consequat eiusmod nulla. Nisi duis aliquip occaecat labore ullamco deserunt reprehenderit nisi cupidatat reprehenderit ipsum eu aliquip duis.',
  },
  {
    name: 'Nero',
    image:
      'https://thumbs.dreamstime.com/b/photo-steak-brussel-sprout-will-be-great-menus-advertisements-other-places-where-food-photography-needed-129217121.jpg',
    status: 'Open',
    distance: '2 km',
    categories: ['Food', 'Drink'],
    updatedAt: '2020-04-07 08:50:18',
    lastConversation:
      'Do magna id consectetur irure ullamco nostrud duis id cupidatat ex ea. Aliqua nostrud et ut ipsum aliqua cillum dolor Lorem fugiat amet adipisicing nisi culpa est. Ad Lorem commodo anim reprehenderit duis. Sunt ea labore et cupidatat laboris anim laboris eiusmod anim occaecat laboris veniam. Ipsum cillum tempor sint ex consectetur reprehenderit deserunt dolore ut id est laborum do non. Anim esse sunt laboris qui aute esse irure est ullamco duis ipsum eu adipisicing adipisicing.',
  },
];

export default class InboxScreen extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <ScrollView>
        <View
          style={[
            AppStyles.section,
            AppStyles.sectionVertical,
            AppStyles.shadow,
          ]}>
          <Text style={Fonts.style.xxl3}>{I18n.t('inbox')}</Text>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item, idx) => `inbox-${idx}`}
          renderItem={({item}) => (
            <ChatRoom item={item} onPress={() => console.tron.log('pressed')} />
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
