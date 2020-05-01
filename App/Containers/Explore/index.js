import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

import {Colors, Fonts, Metrics, Images, ApplicationStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

export default class ExploreScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={ApplicationStyles.screen.section}>
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
              color={Colors.text}
            />
            <TextInput
              style={{flex: 1, marginLeft: Metrics.smallMargin}}
              placeholder={I18n.t('searchPlaceholder')}
            />
          </View>
        </View>
        <View
          style={{
            ...ApplicationStyles.screen.container,
            backgroundColor: Colors.white,
          }}>
          <Swiper
            width={'100%'}
            height={Scale(200)}
            autoplay={true}
            showsButtons={false}
            showsPagination={false}>
            <View>
              <FastImage
                style={{width: '100%', height: Scale(200)}}
                source={{
                  uri:
                    'https://ak1.picdn.net/shutterstock/videos/22497541/thumb/1.jpg',
                }}
              />
            </View>
            <View>
              <FastImage
                style={{width: '100%', height: Scale(200)}}
                source={{
                  uri:
                    'https://www.francescodazzi.com/img/s/v-10/p2544718669-3.jpg',
                }}
              />
            </View>
            <View>
              <FastImage
                style={{width: '100%', height: Scale(200)}}
                source={{
                  uri:
                    'https://cdn.i-scmp.com/sites/default/files/d8/images/2019/06/24/61efb454-672b-11e9-a2c3-042d2f2c8874_image_hires_143424_0.jpg',
                }}
              />
            </View>
          </Swiper>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
