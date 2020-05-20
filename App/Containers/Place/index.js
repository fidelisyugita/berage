/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Swiper from 'react-native-swiper';
import {getDistance, convertDistance} from 'geolib';
import Geolocation from 'react-native-geolocation-service';

import PlaceActions from '../../Redux/PlaceRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale, GetUserCoordinate} from '../../Utils';

import CustomImage from '../../Components/CustomImage';
import Post from '../../Components/Post/Post';
import {DropDownHolder} from '../../Components/DropDownHolder';
import Loader from '../../Components/Loader';

import {posts} from '../Dummy';

export class PlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.navigation.getParam('item', null),
    };
  }

  componentDidMount() {
    // this.getUserPosition();
  }

  render() {
    const {navigation, currentUser, userLocation} = this.props;
    const {item} = this.state;

    const owner = item.updatedBy || item.createdBy;

    return (
      <ScrollView>
        <View style={AppStyles.shadow}>
          <View>
            <TouchableHighlight
              onPress={() => navigation.pop()}
              style={{...AppStyles.btnIcon, ...styles.headerIcon}}>
              <AntDesign
                name="arrowleft"
                size={Metrics.icons.tiny}
                color={Colors.silver}
              />
            </TouchableHighlight>
            <TouchableHighlight
              // onPress={() => navigation.pop()}
              style={{
                ...AppStyles.btnIcon,
                ...styles.headerIcon,
                left: Scale(280),
              }}>
              <AntDesign
                name="sharealt"
                size={Metrics.icons.tiny}
                color={Colors.silver}
              />
            </TouchableHighlight>
            {owner && owner.id === currentUser.id ? (
              <TouchableHighlight
                onPress={() => navigation.navigate('AddPlaceScreen', {item})}
                style={{
                  ...AppStyles.btnIcon,
                  ...styles.headerIcon,
                  left: Scale(325),
                }}>
                <AntDesign
                  name={'edit'}
                  size={Metrics.icons.tiny}
                  color={Colors.silver}
                />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                // onPress={() => navigation.navigate('AddPlaceScreen', {item})}
                style={{
                  ...AppStyles.btnIcon,
                  ...styles.headerIcon,
                  left: Scale(325),
                }}>
                <AntDesign
                  name={item.isLiked ? 'heart' : 'hearto'}
                  size={Metrics.icons.tiny}
                  color={item.isLiked ? Colors.fire : Colors.silver}
                />
              </TouchableHighlight>
            )}
            <Swiper
              height={Metrics.images.xl + Metrics.marginVertical}
              autoplay={true}
              loop={true}
              showsButtons={false}
              showsPagination={true}>
              {item.images.map(image => (
                <CustomImage
                  source={{uri: image}}
                  style={{
                    ...AppStyles.border5,
                    width: '100%',
                    height: Metrics.images.xl,
                  }}
                />
              ))}
            </Swiper>
          </View>

          <View style={[AppStyles.sectionMargin, AppStyles.borderBottom5]}>
            <Text style={Fonts.style.medium3}>{item.name || '-'}</Text>
            <Text
              style={[
                Fonts.style.small,
                AppStyles.containerSmall,
                AppStyles.containerBottom,
              ]}>
              {item.categories.join(', ')}
            </Text>
          </View>
          <View
            style={[
              AppStyles.sectionVertical,
              AppStyles.section,
              AppStyles.row,
              AppStyles.borderBottom7,
            ]}>
            <View style={[AppStyles.baseMarginRight, AppStyles.minWidth3]}>
              <View style={AppStyles.row}>
                <Fontisto
                  name="clock"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
                <Text style={[AppStyles.smallMarginLeft, Fonts.style.medium3]}>
                  {item.status || '-'}
                </Text>
              </View>
              <Text style={[Fonts.style.small, AppStyles.containerTiny]}>
                {'only few seats left' || '-'}
              </Text>
            </View>
            <View style={AppStyles.flex1}>
              <View style={AppStyles.row}>
                <Fontisto
                  name="map-marker-alt"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
                <Text style={[AppStyles.smallMarginLeft, Fonts.style.medium3]}>
                  {item.location && userLocation
                    ? `${convertDistance(
                        getDistance(userLocation, item.location),
                        'km',
                      )} km`
                    : item.distance || '-'}
                </Text>
              </View>
              <Text style={[Fonts.style.small, AppStyles.containerTiny]}>
                {'4 min'}
              </Text>
            </View>
            <View style={AppStyles.flex1}>
              <View style={AppStyles.row}>
                <Fontisto
                  name="dollar"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
                <Fontisto
                  name="dollar"
                  size={Metrics.icons.tiny}
                  color={Colors.baseText}
                />
                <Fontisto
                  name="dollar"
                  size={Metrics.icons.tiny}
                  color={Colors.border}
                />
                <Fontisto
                  name="dollar"
                  size={Metrics.icons.tiny}
                  color={Colors.border}
                />
              </View>
              <Text style={[Fonts.style.small, AppStyles.containerTiny]}>
                {item.averagePrice || '-'}
              </Text>
            </View>
          </View>
        </View>

        <View style={[AppStyles.baseMarginVertical]}>
          <FlatList
            data={posts}
            keyExtractor={(item, idx) => `post-${idx}`}
            renderItem={({item, idx}) => (
              <Post
                item={item}
                // onPress={() => navigation.navigate('PlaceScreen', {item})}
              />
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerIcon: {
    backgroundColor: Colors.windowTint,
    borderRadius: Metrics.circleRadius,
    position: 'absolute',
  },
});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  userLocation: state.session.userLocation,
  getPopularPlaces: state.place.getPopularPlaces,
  getRecommendedPlaces: state.place.getRecommendedPlaces,
});

const mapDispatchToProps = dispatch => ({
  getPopularPlacesRequest: (data, callback) =>
    dispatch(PlaceActions.getPopularPlacesRequest(data, callback)),
  getRecommendedPlacesRequest: (data, callback) =>
    dispatch(PlaceActions.getRecommendedPlacesRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaceScreen);
