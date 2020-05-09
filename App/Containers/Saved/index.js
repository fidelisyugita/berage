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

import SavedPlace from '../../Components/Place/SavedPlace';

import {images, items} from '../Dummy';

export default class SavedScreen extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <ScrollView>
        <View style={[AppStyles.section, AppStyles.sectionVertical]}>
          <Text style={Fonts.style.xxl3}>{I18n.t('saved')}</Text>
        </View>

        <FlatList
          data={items.filter(item => item.isLiked)}
          keyExtractor={(item, idx) => `saved-${idx}`}
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
