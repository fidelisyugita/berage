import React, {Component} from 'react';
import {ScrollView, Text, Image, View, TouchableOpacity} from 'react-native';

import {Scale} from '../Transforms';
import Logo from '../Images/svg/Logo.svg';

// Styles
import styles from './Styles/LaunchScreenStyles';

export default class LaunchScreen extends Component {
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
