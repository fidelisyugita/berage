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
import {Scale, GetUserCoordinate} from '../../Transforms';

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
      userPosition: null,
      isLoadPosition: false,
    };
  }

  componentDidMount() {
    this.getUserPosition();
  }

  async getUserPosition() {
    this.setState({isLoadPosition: true});
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            console.tron.log({position});
            this.setState({
              userPosition: position.coords,
              isLoadPosition: false,
            });
          },
          error => {
            console.tron.error({error});
            DropDownHolder.alert(
              'error',
              I18n.t('errorDefault'),
              error.message || I18n.t('tryAgain'),
            );
            this.setState({isLoadPosition: false});
          },
        );
      } else {
        console.tron.error({error: 'permission'});
        DropDownHolder.alert('error', I18n.t('permissionDenied'), undefined);
        this.setState({isLoadPosition: false});
      }
    } catch (error) {
      console.tron.error({error});
      DropDownHolder.alert(
        'error',
        I18n.t('errorDefault'),
        error.message || I18n.t('tryAgain'),
      );
      this.setState({isLoadPosition: false});
    }
    /**
     * TODO
     * dunno why this isn't worked
     */
    // try {
    //   const coords = await GetUserCoordinate();
    //   console.tron.log({userPosition: coords});
    //   this.setState({userPosition: coords});
    // } catch (error) {
    //   console.tron.error({error});
    //   DropDownHolder.alert(
    //     'error',
    //     I18n.t('errorDefault'),
    //     error.message || I18n.t('tryAgain'),
    //   );
    // }
  }

  render() {
    const {navigation, currentUser} = this.props;
    const {item, userPosition, isLoadPosition} = this.state;

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
                {isLoadPosition ? (
                  <Loader size={'small'} />
                ) : (
                  <Text
                    style={[AppStyles.smallMarginLeft, Fonts.style.medium3]}>
                    {item.location && userPosition
                      ? `${convertDistance(
                          getDistance(userPosition, item.location),
                          'km',
                        )} km`
                      : item.distance || '-'}
                  </Text>
                )}
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
