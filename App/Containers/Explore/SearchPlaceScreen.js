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

export class SearchPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      searchText: '',
      firstOpen: true,
    };
  }

  componentDidMount() {}

  onSearch = () => {
    const {getPlacesRequest} = this.props;
    const {searchText} = this.state;

    this.setState({firstOpen: false});

    getPlacesRequest({searchText});
  };

  render() {
    const {navigation, userLocation, getPlaces} = this.props;
    const {refreshing, searchText, firstOpen} = this.state;

    return (
      <ScrollView>
        <ModalLoader
          visible={getPlaces.fetching}
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
        </View>

        <View style={[AppStyles.container, AppStyles.section]}>
          <FlatList
            data={getPlaces.payload || []}
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
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  userLocation: state.session.userLocation,
  getPlaces: state.place.getPlaces,
});

const mapDispatchToProps = dispatch => ({
  getPlacesRequest: (data, callback) =>
    dispatch(PlaceActions.getPlacesRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPlaceScreen);
