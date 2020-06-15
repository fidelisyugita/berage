/* eslint-disable curly */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, Image, View, TouchableOpacity} from 'react-native';

import SessionActions from '../Redux/SessionRedux';
import FavoriteActions from '../Redux/FavoriteRedux';

import I18n from '../I18n';
import {Scale} from '../Transforms';
import {GetUserCoordinate} from '../Lib';

import Logo from '../Images/svg/Logo.svg';

import {DropDownHolder} from '../Components/DropDownHolder';

// Styles
import styles from './Styles/LaunchScreenStyles';

export class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      denyCounter: 0,
    };
  }

  componentDidMount() {
    // this.getLocation();
    this.loadData();

    setTimeout(() => this.props.navigation.navigate('Main'), 500);
  }

  loadData() {
    const {currentUser, getFavoritesRequest} = this.props;
    if (currentUser) getFavoritesRequest();
  }

  async getLocation() {
    const {saveUserLocation} = this.props;

    try {
      const coords = await GetUserCoordinate();
      console.tron.log({getUserPosition: coords});
      saveUserLocation(coords);
    } catch (error) {
      console.tron.error({error});
      DropDownHolder.alert(
        'error',
        error.message || I18n.t('errorDefault'),
        I18n.t('needLocationAccess'),
      );
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        // onPress={() => this.props.navigation.navigate('Main')}
      >
        <Logo width={Scale(300)} height={Scale(50)} />
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.session.user,
  userLocation: state.session.userLocation,
  favoriteIds: state.session.favoriteIds,
});

const mapDispatchToProps = dispatch => ({
  saveUserLocation: data => dispatch(SessionActions.saveUserLocation(data)),
  getFavoritesRequest: (data, callback) =>
    dispatch(FavoriteActions.getFavoritesRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaunchScreen);
