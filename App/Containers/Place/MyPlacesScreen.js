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
} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

import PlaceActions from '../../Redux/PlaceRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import CustomImage from '../../Components/CustomImage';
import Loader from '../../Components/Loader';
import SavedPlace from '../../Components/Place/SavedPlace';
import CustomHeader from '../../Components/CustomHeader';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

import {images, items} from '../Dummy';

export class MyPlacesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    const {navigation, currentUser} = this.props;
    const {isLoading} = this.state;

    return (
      <ScrollView>
      <CustomHeader onBack={() => navigation.pop()} />
        <FlatList
          data={items.filter(item => item.isLiked)}
          keyExtractor={(item, idx) => `saved-${idx}`}
          renderItem={({item}) => (
            <SavedPlace
              item={item}
              onPress={() => navigation.navigate('PlaceScreen', {item})}
            />
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  savePlaceRequest: (data, callback) =>
    dispatch(PlaceActions.savePlaceRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPlacesScreen);
