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
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';
import Geolocation from 'react-native-geolocation-service';

import PlaceActions from '../../Redux/PlaceRedux';
import FavoriteActions from '../../Redux/FavoriteRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Utils';

import CustomImage from '../../Components/CustomImage';
import Loader from '../../Components/Loader';
import ModalLoader from '../../Components/Modal/ModalLoader';
import Place from '../../Components/Place/Place';
import {DropDownHolder} from '../../Components/DropDownHolder';

import {images, items} from '../Dummy';

export class ExploreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {
      getPopularPlacesRequest,
      getRecommendedPlacesRequest,
      getFavoritesRequest,
    } = this.props;
    const {refreshing} = this.state;

    if (!refreshing) getFavoritesRequest();

    this.setState({isLoading: true, refreshing: false});

    getPopularPlacesRequest(null, this.getPopularPlacesCallback);
    getRecommendedPlacesRequest(null, this.getRecommendedPlacesCallback);
  }

  getPopularPlacesCallback = result => {
    if (result.ok) {
      console.tron.log({result});
    }
    this.setState({isLoading: false});
  };

  getRecommendedPlacesCallback = result => {
    if (result.ok) {
      console.tron.log({result});
    }
    this.setState({isLoading: false});
  };

  onRefresh = () => {
    this.setState({refreshing: true}, () => this.componentDidMount());
  };

  renderHeader = ({section}) => {
    return (
      <View
        style={{
          ...AppStyles.sectionVerticalSmall,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={Fonts.style.large3}>{section.title}</Text>
        <TouchableOpacity onPress={section.onPress}>
          <Text style={Fonts.style.large3}>{I18n.t('seeAll')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      navigation,
      getPopularPlaces,
      getRecommendedPlaces,
      userLocation,
    } = this.props;
    const {refreshing} = this.state;
    const sections = [
      {
        title: I18n.t('popular'),
        data: getPopularPlaces.payload || [],
        onPress: () => console.tron.log({clicked: 'See all'}),
      },
      {
        title: I18n.t('recommended'),
        data: getRecommendedPlaces.payload || [],
        onPress: () => console.tron.log({clicked: 'See all'}),
      },
    ];

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }>
        <ModalLoader
          visible={getPopularPlaces.fetching && getRecommendedPlaces.fetching}
          imageSource={Images.homeLoader}
        />

        <View style={[AppStyles.container, AppStyles.section]}>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: Metrics.circleRadius,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: Metrics.marginHorizontal,
              ...AppStyles.shadow,
            }}>
            <Icon
              name="magnifier"
              size={Metrics.icons.tiny}
              color={Colors.placeholder}
            />
            <TextInput
              style={[
                Fonts.style.medium,
                AppStyles.smallMarginLeft,
                AppStyles.flex1,
              ]}
              placeholder={I18n.t('searchPlaceholder')}
            />
          </View>
        </View>

        <View
          style={{
            ...AppStyles.container,
            // width: Scale(300), //make the image smaller
          }}>
          <Swiper
            // width={Scale(375)} //but swiper bigger
            height={Metrics.images.xl + Metrics.baseMargin}
            autoplay={true}
            loop={true}
            showsButtons={false}
            showsPagination={true}>
            {images.map(image => (
              // <View
              //   key={image}
              //   style={
              //     {
              //       //   marginRight: Metrics.marginHorizontal,
              //     }
              //   }>
              <CustomImage
                key={image}
                source={{uri: image}}
                style={[
                  AppStyles.border3,
                  {
                    width: '100%',
                    height: Metrics.images.xl,
                  },
                ]}
              />
              // </View>
            ))}
          </Swiper>
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item, idx) => item + idx}
          renderSectionHeader={this.renderHeader}
          renderItem={({item}) => (
            <Place
              item={item}
              userLocation={userLocation}
              onPress={() => navigation.navigate('PlaceScreen', {item})}
            />
          )}
          style={[AppStyles.section]}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

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
  getFavoritesRequest: (data, callback) =>
    dispatch(FavoriteActions.getFavoritesRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExploreScreen);
