/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  RefreshControl,
  SectionList,
  TouchableOpacity,
  TouchableHighlight,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';
import Geolocation from 'react-native-geolocation-service';

import PlaceActions from '../../Redux/PlaceRedux';
import BannerActions from '../../Redux/BannerRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';
import {NavigateUrl} from '../../Lib';

import CustomImage from '../../Components/CustomImage';
import Loader from '../../Components/Loader';
import ModalLoader from '../../Components/Modal/ModalLoader';
import Place from '../../Components/Place/Place';
import {DropDownHolder} from '../../Components/DropDownHolder';
import EmptyState from '../../Components/EmptyState';
import CustomHeader from '../../Components/CustomHeader';

import {images, items} from '../Dummy';

const DATA_PER_PAGE = 10;

export class ListPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      isPopular: props.navigation.getParam('isPopular', false),
      offset: 0,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {getPopularPlacesRequest, getRecommendedPlacesRequest} = this.props;
    const {isPopular, offset} = this.state;

    if (isPopular) getPopularPlacesRequest({limit: DATA_PER_PAGE, offset});
    else getRecommendedPlacesRequest({limit: DATA_PER_PAGE, offset});
  }

  loadMore = () => {
    const {places} = this.props;
    const {offset} = this.state;

    if (places.length >= DATA_PER_PAGE * (offset + 1))
      this.setState({offset: offset + 1}, () => this.loadData());
  };

  render() {
    const {
      navigation,
      userLocation,
      getPopularPlaces,
      getRecommendedPlaces,
      places,
    } = this.props;
    const {refreshing} = this.state;

    return (
      <SafeAreaView>
        <ScrollView>
          {/* <ModalLoader
          visible={getPopularPlaces.fetching || getRecommendedPlaces.fetching}
          imageSource={Images.homeLoader}
        /> */}
          <CustomHeader onBack={() => navigation.pop()} />
          {(getPopularPlaces.fetching || getRecommendedPlaces.fetching) && (
            <Loader style={[AppStyles.sectionVertical]} />
          )}

          <View style={[AppStyles.container, AppStyles.section]}>
            <FlatList
              data={places || []}
              keyExtractor={(item, idx) => item + idx}
              // onEndReached={this.loadMore}
              // onEndReachedThreshold={0.4}
              renderItem={({item}) => (
                <Place
                  item={item}
                  userLocation={userLocation}
                  onPress={() => navigation.navigate('PlaceScreen', {item})}
                />
              )}
              ListEmptyComponent={() => (
                <EmptyState
                  imageSource={Images.homeLoader}
                  message={I18n.t('searchNotFound')}
                  containerStyle={{
                    backgroundColor: Colors.tempHomeLoader,
                    height: Metrics.screenHeight,
                  }}
                  imageStyle={{
                    width: Metrics.screenWidth,
                    height: Metrics.screenWidth,
                  }}
                />
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  userLocation: state.session.userLocation,
  getPopularPlaces: state.place.getPopularPlaces,
  getRecommendedPlaces: state.place.getRecommendedPlaces,
  places: state.place.places,
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
)(ListPlaceScreen);
