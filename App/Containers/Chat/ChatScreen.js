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
import {Scale} from '../../Transforms';
import FirebaseChat from '../../Lib/FirebaseChat';

import CustomImage from '../../Components/CustomImage';
import Loader from '../../Components/Loader';
import SavedPlace from '../../Components/Place/SavedPlace';
import CustomHeader from '../../Components/CustomHeader';
import EmptyState from '../../Components/EmptyState';
import ModalLoader from '../../Components/Modal/ModalLoader';
import LoginButton from '../../Components/LoginButton';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

let firebaseChat;

export class ChatScreen extends Component {
  constructor(props) {
    firebaseChat = new FirebaseChat(props.navigation.getParam('user', null));

    super(props);
    this.state = {
      isLoading: false,
      messages: [],
      targetUser: props.navigation.getParam('user', null),
    };
  }

  componentDidMount() {
    firebaseChat.onMessages(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      })),
    );
  }

  componentWillUnmount() {
    firebaseChat.off();
  }

  render() {
    const {navigation, currentUser} = this.props;
    const {isLoading, messages, targetUser} = this.state;
    const avatar = (targetUser && targetUser.avatar) || targetUser.photoURL;
    const name = (targetUser && targetUser.name) || targetUser.displayName;

    return (
      <SafeAreaView style={[AppStyles.flex1]}>
        <ModalLoader visible={isLoading} />
        <CustomHeader
          onBack={() => navigation.pop()}
          containerStyle={AppStyles.shadow}
          renderTitle={() => (
            <View style={[AppStyles.row, AppStyles.alignCenter]}>
              <CustomImage
                source={{uri: avatar || null}}
                style={[
                  AppStyles.avatarSmall,
                  AppStyles.borderCircle,
                  AppStyles.smallMarginRight,
                ]}
                imageStyle={AppStyles.borderCircle}
              />
              <Text
                numberOfLines={1}
                style={{...Fonts.style.large3, maxWidth: Scale(180)}}>
                {name || '-'}
              </Text>
            </View>
          )}
        />
        <GiftedChat
          messages={messages}
          onSend={firebaseChat.send}
          user={{
            _id: currentUser.uid || currentUser.id,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
            fcmToken: currentUser.fcmToken,
          }}
        />
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen);
