import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  SectionList,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import FavoriteActions from '../../Redux/FavoriteRedux';
import AuthActions from '../../Redux/AuthRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Utils';

import SavedPlace from '../../Components/Place/SavedPlace';
import HeaderTitle from '../../Components/HeaderTitle';
import CustomImage from '../../Components/CustomImage';
import EmptyState from '../../Components/EmptyState';
import ModalLoader from '../../Components/Modal/ModalLoader';
import LoginButton from '../../Components/LoginButton';

import {images, items} from '../Dummy';

export class SavedScreen extends Component {
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
    const {getFavoritesRequest, favorites} = this.props;
    const {refreshing} = this.state;

    if (favorites.length < 1 || refreshing) {
      this.setState({isLoading: true, refreshing: false});

      getFavoritesRequest(null, this.getFavoritesCallback);
    }
  }

  getFavoritesCallback = result => {
    if (result.ok) {
      console.tron.log({result});
    }
    this.setState({isLoading: false});
  };

  onLoginPress = () => {
    const {loginWithGoogleRequest} = this.props;

    this.setState({isLoading: true});

    loginWithGoogleRequest(null, this.googleLoginCallback);
  };

  googleLoginCallback = result => {
    if (result.ok) {
      console.tron.log({result});
    }
    this.setState({isLoading: false});
  };

  onRefresh = () => {
    this.setState({refreshing: true}, () => this.componentDidMount());
  };

  render() {
    const {
      navigation,
      currentUser,
      userLocation,
      getFavorites,
      favorites,
    } = this.props;
    const {isLoading, refreshing} = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }>
        <ModalLoader visible={isLoading || getFavorites.fetching} />
        <HeaderTitle title={I18n.t('saved')} shadow />
        <FlatList
          data={favorites}
          keyExtractor={(item, idx) => item + idx}
          renderItem={({item}) => (
            <SavedPlace
              item={item}
              onPress={() => navigation.navigate('PlaceScreen', {item})}
              userLocation={userLocation}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyState
              imageSource={Images.emptySavedData}
              message={I18n.t('savedDetail')}
              containerStyle={{
                backgroundColor: Colors.white,
                height: Metrics.screenHeight,
              }}
              imageStyle={{
                width: Metrics.screenWidth,
                height: Metrics.screenWidth,
              }}>
              {!currentUser && <LoginButton onPress={this.onLoginPress} />}
            </EmptyState>
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  userLocation: state.session.userLocation,
  getFavorites: state.favorite.getFavorites,
  favorites: state.favorite.favorites,
});

const mapDispatchToProps = dispatch => ({
  getFavoritesRequest: (data, callback) =>
    dispatch(FavoriteActions.getFavoritesRequest(data, callback)),
  loginWithGoogleRequest: (data, callback) =>
    dispatch(AuthActions.loginWithGoogleRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedScreen);
