import React, {Component} from 'react';
import {ScrollView, Text, Image, View, TouchableHighlight} from 'react-native';
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js';

import {Images} from '../Themes';
import {Scale} from '../Transforms';
import Logo from '../Images/svg/Logo.svg';

// Styles
import styles from './Styles/LaunchScreenStyles';

export default class LaunchScreen extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={() => this.props.navigation.navigate('Main')}>
        <Logo width={Scale(300)} height={Scale(50)} />
        {/* <DevscreensButton /> */}
      </TouchableHighlight>
    );
  }
}
