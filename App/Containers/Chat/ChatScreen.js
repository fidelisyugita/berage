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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import ImagePicker from 'react-native-image-crop-picker';
import {GiftedChat} from 'react-native-gifted-chat';

import PlaceActions from '../../Redux/PlaceRedux';
import AuthActions from '../../Redux/AuthRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Utils';

import CustomImage from '../../Components/CustomImage';
import Loader from '../../Components/Loader';
import SavedPlace from '../../Components/Place/SavedPlace';
import CustomHeader from '../../Components/CustomHeader';
import EmptyState from '../../Components/EmptyState';
import ModalLoader from '../../Components/Modal/ModalLoader';
import LoginButton from '../../Components/LoginButton';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

export class ChatScreen extends Component {
  state = {
    isLoading: false,
    messages: false,
    targetUser: this.props.navigation.getParam('user', null),
  };

  componentDidMount() {
    // this.loadData();
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'yuk Berage!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  loadData() {
    const {getUserPlacesRequest, myPlaces} = this.props;
    const {refreshing} = this.state;

    if (myPlaces.length < 1 || refreshing) {
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

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    const {navigation, currentUser} = this.props;
    const {isLoading, messages, targetUser} = this.state;

    return (
      <View style={[AppStyles.flex1]}>
        <ModalLoader visible={isLoading} />
        <CustomHeader
          onBack={() => navigation.pop()}
          renderTitle={() => (
            <View style={[AppStyles.row, AppStyles.alignCenter]}>
              <CustomImage
                source={{uri: (targetUser && targetUser.image) || null}}
                style={[
                  AppStyles.avatarMedium,
                  AppStyles.borderCircle,
                  AppStyles.smallMarginRight,
                ]}
                imageStyle={AppStyles.borderCircle}
              />
              <Text
                numberOfLines={1}
                style={{...Fonts.style.large3, maxWidth: Scale(180)}}>
                {(targetUser && targetUser.name) || '-'}
              </Text>
            </View>
          )}
        />
        <GiftedChat
          messages={messages}
          onSend={data => this.onSend(data)}
          user={{...currentUser, _id: currentUser.uid}}
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
)(ChatScreen);
