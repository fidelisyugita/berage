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
import LoadingIndicator from '../../Components/LoadingIndicator';
import SavedPlace from '../../Components/Place/SavedPlace';

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
        <View style={[AppStyles.row, AppStyles.justifyBetween]}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={[AppStyles.btnIcon]}>
            <AntDesign
              name="arrowleft"
              size={Metrics.icons.tiny}
              color={Colors.baseText}
            />
          </TouchableOpacity>
        </View>
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
