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
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import ImagePicker from 'react-native-image-crop-picker';

import PlaceActions from '../../Redux/PlaceRedux';
import AuthActions from '../../Redux/AuthRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import CustomImage from '../../Components/CustomImage';
import Loader from '../../Components/Loader';
import SavedPlace from '../../Components/Place/SavedPlace';
import CustomHeader from '../../Components/CustomHeader';
import EmptyState from '../../Components/EmptyState';
import ModalLoader from '../../Components/Modal/ModalLoader';
import LoginButton from '../../Components/LoginButton';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

export class MyPlacesScreen extends Component {
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
    const {currentUser, getUserPlacesRequest, myPlaces} = this.props;
    const {refreshing} = this.state;

    if (currentUser && (myPlaces.length < 1 || refreshing)) {
      this.setState({isLoading: true, refreshing: false});

      getUserPlacesRequest(null, this.getUserPlacesCallback);
    }
  }

  getUserPlacesCallback = result => {
    if (result.ok) {
      console.tron.log({result});
    }
    this.setState({isLoading: false});
  };

  onLoginPress = () => {
    const {loginWithGoogleRequest, loginWithAppleRequest} = this.props;

    this.setState({isLoading: true});

    if (Platform.OS === 'ios') loginWithAppleRequest(null, this.loginCallback);
    else loginWithGoogleRequest(null, this.loginCallback);
  };

  loginCallback = result => {
    if (result.ok) {
      console.tron.log({result});
      this.loadData();
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
      getUserPlaces,
      myPlaces,
    } = this.props;
    const {isLoading, refreshing} = this.state;

    return (
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }>
          <ModalLoader visible={isLoading || getUserPlaces.fetching} />
          <CustomHeader onBack={() => navigation.pop()} />
          <FlatList
            data={myPlaces}
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
                message={I18n.t('hostDetail')}
                containerStyle={{
                  backgroundColor: Colors.white,
                  height: Metrics.screenHeight,
                }}
                imageStyle={{
                  width: Metrics.screenWidth,
                  height: Metrics.screenWidth,
                }}>
                {currentUser ? (
                  <LoginButton
                    text={I18n.t('add')}
                    onPress={() => navigation.navigate('AddPlaceScreen')}
                  />
                ) : (
                  <LoginButton onPress={this.onLoginPress} />
                )}
              </EmptyState>
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
  userLocation: state.session.userLocation,
  getUserPlaces: state.place.getUserPlaces,
  myPlaces: state.place.myPlaces,
});

const mapDispatchToProps = dispatch => ({
  getUserPlacesRequest: (data, callback) =>
    dispatch(PlaceActions.getUserPlacesRequest(data, callback)),
  loginWithGoogleRequest: (data, callback) =>
    dispatch(AuthActions.loginWithGoogleRequest(data, callback)),
  loginWithAppleRequest: (data, callback) =>
    dispatch(AuthActions.loginWithAppleRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPlacesScreen);
