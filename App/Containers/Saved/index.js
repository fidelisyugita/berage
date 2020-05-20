import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  SectionList,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Utils';

import SavedPlace from '../../Components/Place/SavedPlace';
import HeaderTitle from '../../Components/HeaderTitle';

import {images, items} from '../Dummy';

export default class SavedScreen extends Component {
  render() {
    const {navigation} = this.props;
    const sections = [
      {
        title: I18n.t('saved'),
        data: items.filter(item => item.isLiked),
      },
    ];

    return (
      <SectionList
        sections={sections}
        keyExtractor={(item, idx) => item + idx}
        renderSectionHeader={({section: {title}}) => (
          <HeaderTitle title={title} />
        )}
        renderItem={({item}) => (
          <SavedPlace
            item={item}
            onPress={() => navigation.navigate('PlaceScreen', {item})}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({});
