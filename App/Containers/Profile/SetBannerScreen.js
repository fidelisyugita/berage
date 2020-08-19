/* eslint-disable curly */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  SectionList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import ImagePicker from 'react-native-image-crop-picker';

import BannerActions from '../../Redux/BannerRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';
import {NavigateUrl, DeleteImage} from '../../Lib';

import CustomImage from '../../Components/CustomImage';
import Loader from '../../Components/Loader';
import SavedPlace from '../../Components/Place/SavedPlace';
import CustomHeader from '../../Components/CustomHeader';
import EmptyState from '../../Components/EmptyState';
import ModalLoader from '../../Components/Modal/ModalLoader';
import LoginButton from '../../Components/LoginButton';
import RenderBanner from '../../Components/Banner/Banner';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

export class SetBannerScreen extends Component {
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
    const {currentUser, getBannersRequest, banners} = this.props;
    const {refreshing} = this.state;

    if (currentUser && (banners.length < 1 || refreshing)) {
      this.setState({isLoading: true, refreshing: false});

      getBannersRequest(null, this.getBannersCallback);
    }
  }

  getBannersCallback = result => {
    if (result.ok) {
      console.tron.log({result});
    }
    this.setState({isLoading: false});
  };

  onRefresh = () => {
    this.setState({refreshing: true}, () => this.componentDidMount());
  };

  onDeletePress(item) {
    //change to soft delete
    // if (item.image && item.image.refPath) DeleteImage(item.image.refPath);
    this.props.deleteBannerRequest({id: item.id});
  }

  render() {
    const {
      navigation,
      currentUser,
      userLocation,
      getBanners,
      banners,
      deleteBanner,
    } = this.props;
    const {isLoading, refreshing} = this.state;

    return (
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }>
          <ModalLoader
            visible={isLoading || getBanners.fetching || deleteBanner.fetching}
          />
          <CustomHeader
            onBack={() => navigation.pop()}
            renderRight={() => (
              <TouchableOpacity
                onPress={() => navigation.navigate('AddBannerScreen')}>
                <Text
                  style={{...Fonts.style.large, padding: Metrics.smallMargin}}>
                  {I18n.t('add')}
                </Text>
              </TouchableOpacity>
            )}
          />
          <FlatList
            data={banners}
            keyExtractor={(item, idx) => item + idx}
            renderItem={({item}) => (
              <RenderBanner
                item={item}
                onPress={() => NavigateUrl(item.url)}
                onDeletePress={() => this.onDeletePress(item)}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  getBanners: state.banner.getBanners,
  banners: state.banner.banners,
  deleteBanner: state.banner.deleteBanner,
});

const mapDispatchToProps = dispatch => ({
  getBannersRequest: (data, callback) =>
    dispatch(BannerActions.getBannersRequest(data, callback)),
  deleteBannerRequest: (data, callback) =>
    dispatch(BannerActions.deleteBannerRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetBannerScreen);
