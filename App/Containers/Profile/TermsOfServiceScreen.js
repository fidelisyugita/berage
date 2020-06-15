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
} from 'react-native';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';

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

export class TermsOfServiceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
    };
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={AppStyles.flex1}>
        <CustomHeader onBack={() => navigation.pop()} />
        <WebView
          source={{uri: 'https://berage.web.app/terms.html'}}
          style={[AppStyles.sectionVertical]}
        />
      </View>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TermsOfServiceScreen);
