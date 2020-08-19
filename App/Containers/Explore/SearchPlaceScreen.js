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

import {images, items} from '../Dummy';

const DATA_PER_PAGE = 10;

export class SearchPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;

    this.state = {
      isLoading: false,
      refreshing: false,
      searchText: '',
      firstOpen: true,
      page: 0,
      isLoadMore: false,
    };
  }

  componentDidMount() {}

  onSearch = () => {
    const {getPlacesRequest} = this.props;
    const {searchText, page} = this.state;

    this.setState({firstOpen: false, page: 0, isLoadMore: false});
    getPlacesRequest({searchText, page: 0, limit: DATA_PER_PAGE});
  };

  loadMore = () => {
    const {getPlacesRequest, getPlaces} = this.props;
    const {searchText, page} = this.state;

    console.tron.log({getPlaces});

    const {payload} = getPlaces;

    if (
      !this.onEndReachedCalledDuringMomentum &&
      payload.length === DATA_PER_PAGE
    ) {
      console.tron.log('load moreeee');

      this.setState({page: page + 1, isLoadMore: true});
      getPlacesRequest({searchText, page: page + 1, limit: DATA_PER_PAGE});
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  renderHeader = () => {
    const {navigation, userLocation, getPlaces, places} = this.props;
    const {refreshing, searchText, firstOpen, isLoadMore} = this.state;

    return (
      <View
        style={[
          AppStyles.container,
          AppStyles.containerBottom,
          AppStyles.section,
        ]}>
        <View
          style={[
            AppStyles.shadow,
            AppStyles.flex1,
            AppStyles.borderCircle,
            AppStyles.row,
            AppStyles.alignCenter,
            {
              paddingHorizontal: Metrics.marginHorizontal,
              height: Scale(50),
            },
          ]}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Icon
              name="arrow-left"
              size={Metrics.icons.tiny}
              color={Colors.placeholder}
            />
          </TouchableOpacity>
          <TextInput
            style={[
              Fonts.style.medium,
              AppStyles.smallMarginLeft,
              AppStyles.flex1,
            ]}
            value={searchText}
            onChangeText={text => this.setState({searchText: text})}
            onEndEditing={this.onSearch}
            placeholder={I18n.t('searchPlaceholder')}
          />
        </View>

        {getPlaces.fetching && !isLoadMore && (
          <Loader style={[AppStyles.sectionVertical]} />
        )}
      </View>
    );
  };

  renderFooter = () => {
    const {navigation, userLocation, getPlaces, places} = this.props;
    const {refreshing, searchText, firstOpen, isLoadMore} = this.state;

    return (
      <View>
        {getPlaces.fetching && isLoadMore && (
          <Loader style={[AppStyles.sectionVertical]} />
        )}
      </View>
    );
  };

  render() {
    const {navigation, userLocation, getPlaces, places} = this.props;
    const {refreshing, searchText, firstOpen, isLoadMore} = this.state;

    return (
      <SafeAreaView>
        <FlatList
          style={[AppStyles.section]}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          data={places || []}
          keyExtractor={(item, idx) => item + idx}
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
              message={firstOpen ? null : I18n.t('searchNotFound')}
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
          onEndReachedThreshold={0.1}
          onEndReached={this.loadMore}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  userLocation: state.session.userLocation,
  getPlaces: state.place.getPlaces,
  places: state.place.places,
});

const mapDispatchToProps = dispatch => ({
  getPlacesRequest: (data, callback) =>
    dispatch(PlaceActions.getPlacesRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPlaceScreen);
