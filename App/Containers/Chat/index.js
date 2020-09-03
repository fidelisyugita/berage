/* eslint-disable curly */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  SectionList,
  RefreshControl,
  SafeAreaView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';

import AuthActions from '../../Redux/AuthRedux';
import ChatActions from '../../Redux/ChatRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';
import FirebaseChat from '../../Lib/FirebaseChat';

import Room from '../../Components/Chat/Room';
import HeaderTitle from '../../Components/HeaderTitle';
import EmptyState from '../../Components/EmptyState';
import ModalLoader from '../../Components/Modal/ModalLoader';
import LoginButton from '../../Components/LoginButton';

let firebaseChat;

export class ChatRoomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      rooms: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {currentUser} = this.props;
    const {rooms} = this.state;
    const tempRooms = [...rooms];

    if (currentUser) {
      if (!firebaseChat) firebaseChat = new FirebaseChat();
      firebaseChat.onRooms(room => {
        const roomIndex = tempRooms.findIndex(
          chatRoom => chatRoom._id === room._id,
        );
        if (roomIndex > -1) tempRooms.splice(roomIndex, 1, room);
        else tempRooms.push(room);
        this.setState({rooms: tempRooms});
      });
    }
  }

  componentWillUnmount() {
    const {currentUser} = this.props;

    if (currentUser && firebaseChat) {
      firebaseChat.offRooms();
      firebaseChat = null;
    }
  }

  onLoginPress = () => {
    const {loginWithGoogleRequest, loginWithAppleRequest} = this.props;

    this.setState({isLoading: true});

    if (Platform.OS === 'ios') loginWithAppleRequest(null, this.loginCallback);
    else loginWithGoogleRequest(null, this.loginCallback);
  };

  loginCallback = result => {
    if (result.ok) {
      console.tron.log({result});
      this.loadData();
    }
    this.setState({isLoading: false}, () => this.componentDidMount());
  };

  onRefresh = () => {
    // FirebaseChat.shared.offRooms();
    this.setState({rooms: []}, () => this.componentDidMount());
  };

  render() {
    const {navigation, currentUser} = this.props;
    const {isLoading, refreshing, rooms} = this.state;

    return (
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }>
          <ModalLoader visible={isLoading} />
          <HeaderTitle title={I18n.t('chat')} shadow />
          <FlatList
            data={rooms.sort((a, b) => b.updatedAt - a.updatedAt)}
            keyExtractor={(item, idx) => item + idx}
            renderItem={({item}) => (
              <Room
                item={item}
                onPress={() =>
                  navigation.navigate('ChatScreen', {user: item.user || null})
                }
              />
            )}
            ListEmptyComponent={() => (
              <EmptyState
                imageSource={Images.emptyMessageData}
                message={I18n.t('chatDetail')}
                containerStyle={{
                  backgroundColor: Colors.white,
                  height: Metrics.screenHeight,
                }}
                imageStyle={{
                  width: Metrics.screenWidth,
                  height: Metrics.screenWidth,
                }}>
                {!currentUser && <LoginButton onPress={this.onLoginPress} />}
              </EmptyState>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  rooms: state.chat.rooms,
});

const mapDispatchToProps = dispatch => ({
  loginWithGoogleRequest: (data, callback) =>
    dispatch(AuthActions.loginWithGoogleRequest(data, callback)),
  loginWithAppleRequest: (data, callback) =>
    dispatch(AuthActions.loginWithAppleRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatRoomScreen);
