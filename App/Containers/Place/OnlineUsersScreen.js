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
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';

import AuthActions from '../../Redux/AuthRedux';
import ChatActions from '../../Redux/ChatRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';
import FirebasePlace from '../../Lib/FirebasePlace';

import Room from '../../Components/Chat/Room';
import CustomHeader from '../../Components/CustomHeader';
import EmptyState from '../../Components/EmptyState';
import ModalLoader from '../../Components/Modal/ModalLoader';
import LoginButton from '../../Components/LoginButton';
import CustomImage from '../../Components/CustomImage';

let firebasePlace;

export class OnlineUsersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      item: props.navigation.getParam('item', null),
      onlineUsers: props.navigation.getParam('onlineUsers', []),
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    const {currentUser} = this.props;

    if (currentUser && firebasePlace) {
      /**
       * TODO
       * make sure it's okay
       * or change it
       */
      // firebasePlace.offOnlineUsers();
      // firebasePlace = null;
    }
  }

  loadData() {
    const {currentUser} = this.props;
    const {item, onlineUsers} = this.state;
    const tempUsers = [...onlineUsers];

    /**
     * TODO
     * need check & improve
     * how to remove user that left the place
     */
    if (currentUser && item && item.id) {
      if (!firebasePlace)
        firebasePlace = new FirebasePlace(item.id, currentUser);
      firebasePlace.joinOnline();
      firebasePlace.onOnlineUsers(newUser => {
        // if (newUser.uid !== currentUser.uid) {
        const userIndex = tempUsers.findIndex(user => user.uid === newUser.uid);
        if (userIndex > -1) tempUsers.splice(userIndex, 1, newUser);
        else tempUsers.push(newUser);
        this.setState({onlineUsers: tempUsers});
        // }
      });
    }
  }

  render() {
    const {navigation, currentUser} = this.props;
    const {isLoading, onlineUsers} = this.state;

    return (
      <ScrollView>
        <ModalLoader visible={isLoading} />
        <CustomHeader onBack={() => navigation.pop()} />
        <FlatList
          data={onlineUsers}
          keyExtractor={(item, idx) => item + idx}
          numColumns={3}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                AppStyles.container,
                AppStyles.section,
                AppStyles.flex1,
                AppStyles.alignCenter,
              ]}
              disabled={item.uid === currentUser.uid}
              onPress={() => navigation.navigate('ChatScreen', {user: item})}>
              <CustomImage
                source={{uri: item.photoURL || null}}
                style={[
                  AppStyles.border3,
                  AppStyles.avatarXl,
                  AppStyles.borderCircle,
                ]}
                imageStyle={AppStyles.borderCircle}
              />
              <Text
                numberOfLines={2}
                style={[Fonts.style.small3, Fonts.style.alignCenter]}>
                {item.displayName || '-'}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              imageSource={Images.emptyMessageData}
              message={I18n.t('onlineDetail')}
              containerStyle={{
                backgroundColor: Colors.white,
                height: Metrics.screenHeight,
              }}
              imageStyle={{
                width: Metrics.screenWidth,
                height: Metrics.screenWidth,
              }}
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
  rooms: state.chat.rooms,
});

const mapDispatchToProps = dispatch => ({
  loginWithGoogleRequest: (data, callback) =>
    dispatch(AuthActions.loginWithGoogleRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnlineUsersScreen);
