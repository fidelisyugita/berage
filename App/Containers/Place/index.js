import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

export default class PlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.navigation.getParam('item', null),
    };
  }

  render() {
    const {navigation} = this.props;
    const {item} = this.state;

    return (
      <ScrollView>
        <View>
          <TouchableHighlight
            onPress={() => navigation.pop()}
            style={styles.headerIcon}>
            <Icon
              name="arrowleft"
              size={Metrics.icons.tiny}
              color={Colors.silver}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.pop()}
            style={{...styles.headerIcon, left: Scale(280)}}>
            <Icon
              name="sharealt"
              size={Metrics.icons.tiny}
              color={Colors.silver}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.pop()}
            style={{...styles.headerIcon, left: Scale(325)}}>
            <Icon
              name={item.isLiked ? 'heart' : 'hearto'}
              size={Metrics.icons.tiny}
              color={item.isLiked ? Colors.fire : Colors.silver}
            />
          </TouchableHighlight>
          <Swiper
            height={Scale(200)}
            autoplay={true}
            loop={true}
            showsButtons={false}
            showsPagination={true}>
            {item.images.map(image => (
              <FastImage
                style={{
                  width: '100%',
                  height: Scale(200),
                }}
                source={{
                  uri: image,
                }}
              />
            ))}
          </Swiper>
        </View>
        <View style={[AppStyles.section, AppStyles.borderBottom3]}>
          <Text style={Fonts.style.medium3}>{item.name || '-'}</Text>
          <Text style={Fonts.style.medium}>{item.categories.join(', ')}</Text>
        </View>
        <View
          style={[AppStyles.section, AppStyles.borderBottom7, AppStyles.row]}>
          <Text style={Fonts.style.medium}>{item.status || '-'}</Text>
          <Text style={[AppStyles.baseMarginLeft, Fonts.style.medium]}>
            {item.distance || '-'}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerIcon: {
    backgroundColor: Colors.windowTint,
    borderRadius: Metrics.circleRadius,
    padding: Metrics.smallMargin,
    margin: Metrics.baseMargin,
    position: 'absolute',
    zIndex: 1,
  },
});
