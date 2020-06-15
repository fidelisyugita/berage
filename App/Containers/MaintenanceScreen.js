/* eslint-disable curly */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, Image, View, TouchableOpacity} from 'react-native';

import SessionActions from '../Redux/SessionRedux';
import FavoriteActions from '../Redux/FavoriteRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';
import {Scale} from '../Transforms';
import {GetUserCoordinate} from '../Lib';

import Logo from '../Images/svg/Logo.svg';

import {DropDownHolder} from '../Components/DropDownHolder';
import EmptyState from '../Components/EmptyState';

// Styles
import styles from './Styles/LaunchScreenStyles';

export class MaintenanceScreen extends Component {
  render() {
    return (
      <View
        style={styles.container}
        // onPress={() => this.props.navigation.navigate('Main')}
      >
        <EmptyState
          imageSource={Images.maintenance}
          message={I18n.t('maintenanceDetail')}
          containerStyle={{
            backgroundColor: Colors.white,
            height: Metrics.screenHeight,
          }}
          imageStyle={{
            width: Metrics.screenWidth,
            height: Metrics.screenWidth,
          }}
        />
      </View>
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
)(MaintenanceScreen);
