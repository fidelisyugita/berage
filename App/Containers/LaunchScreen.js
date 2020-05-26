/* eslint-disable curly */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, Image, View, TouchableOpacity} from 'react-native';

import SessionActions from '../Redux/SessionRedux';

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
  }

  async getLocation() {
    /**
     * TODO
     * this is temp solution
     * need to make it better
     */
    const {denyCounter} = this.state;
    const {saveUserLocation} = this.props;

    try {
      const coords = await GetUserCoordinate();
      console.tron.log({getUserPosition: coords});
      saveUserLocation(coords);
    } catch (error) {
      this.setState({denyCounter: denyCounter + 1});
      console.tron.error({error});
      if (denyCounter < 3) {
        DropDownHolder.alert(
          'error',
          error.message || I18n.t('errorDefault'),
          I18n.t('needLocationAccess'),
        );
        this.getLocation();
      }
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.navigation.navigate('Main')}>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaunchScreen);
