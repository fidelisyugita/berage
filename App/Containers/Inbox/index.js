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
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';

import InboxActions from '../../Redux/InboxRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import RenderInbox from '../../Components/Inbox/Inbox';
import HeaderTitle from '../../Components/HeaderTitle';
import CustomImage from '../../Components/CustomImage';
import EmptyState from '../../Components/EmptyState';
import ModalLoader from '../../Components/Modal/ModalLoader';
import LoginButton from '../../Components/LoginButton';

import {chats} from '../Dummy';

export class InboxScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {currentUser, getInboxesRequest, inboxes} = this.props;
    const {refreshing} = this.state;

    if (currentUser && (inboxes.length < 1 || refreshing)) {
      this.setState({isLoading: true, refreshing: false});

      getInboxesRequest(null, this.getinboxesCallback);
    }
  }

  getinboxesCallback = result => {
    if (result.ok) {
      console.tron.log({result});
    }
    this.setState({isLoading: false});
  };

  onLoginPress = () => {
    const {loginWithGoogleRequest} = this.props;

    this.setState({isLoading: true});

    loginWithGoogleRequest(null, this.googleLoginCallback);
  };

  googleLoginCallback = result => {
    if (result.ok) {
      console.tron.log({result});
      this.loadData();
    }
    this.setState({isLoading: false});
  };

  onRefresh = () => {
    this.setState({refreshing: true}, () => this.componentDidMount());
  };

  async onPressItem(url) {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    }
  }

  render() {
    const {navigation, currentUser, getInboxes, inboxes} = this.props;
    const {isLoading, refreshing} = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
        }>
        <ModalLoader visible={isLoading || getInboxes.fetching} />
        <HeaderTitle title={I18n.t('inbox')} shadow />
        <FlatList
          data={inboxes}
          keyExtractor={(item, idx) => item + idx}
          renderItem={({item}) => (
            <RenderInbox
              item={item}
              onPress={() => this.onPressItem(item.url)}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyState
              imageSource={Images.emptyMessageData}
              message={I18n.t('inboxDetail')}
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
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  getInboxes: state.inbox.getInboxes,
  inboxes: state.inbox.inboxes,
});

const mapDispatchToProps = dispatch => ({
  getInboxesRequest: (data, callback) =>
    dispatch(InboxActions.getInboxesRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InboxScreen);
