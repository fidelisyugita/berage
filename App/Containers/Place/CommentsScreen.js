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

import PostActions from '../../Redux/PostRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import Comment from '../../Components/Post/Comment';
import HeaderTitle from '../../Components/HeaderTitle';
import EmptyState from '../../Components/EmptyState';
import ModalLoader from '../../Components/Modal/ModalLoader';
import LoginButton from '../../Components/LoginButton';
import CustomHeader from '../../Components/CustomHeader';
import Loader from '../../Components/Loader';
import CustomImage from '../../Components/CustomImage';
import {DropDownHolder} from '../../Components/DropDownHolder';

import IconUserDefault from '../../Images/svg/IconUserDefault.svg';

const MAX_LENGTH = 280;
const DATA_PER_PAGE = 50;

export class CommentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      item: props.navigation.getParam('item', null),
      textToPost: '',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {currentUser, getCommentsRequest} = this.props;
    const {item} = this.state;

    console.tron.log({item});

    getCommentsRequest({postId: item.id, limit: DATA_PER_PAGE});
  }

  onSubmitPress = () => {
    const {item, textToPost} = this.state;
    const {commentRequest, currentUser} = this.props;

    if (textToPost.length < 1) {
      DropDownHolder.alert('warn', I18n.t('textIsEmpty'), undefined);
    } else {
      this.setState({isLoading: true});

      const data = {
        postId: item.id,
        placeId: item.placeId,
        text: textToPost,
        updatedBy: currentUser,
      };

      console.tron.log({data});

      commentRequest(data, this.commentCallback);
    }
  };

  commentCallback = result => {
    this.setState({isLoading: false, textToPost: ''});
    console.tron.log({result});
  };

  onRefresh = () => {
    // FirebaseChat.shared.offRooms();
    this.setState({refreshing: true}, () => this.componentDidMount());
  };

  render() {
    const {
      navigation,
      currentUser,
      getComments,
      comment,
      rootComments,
    } = this.props;
    const {isLoading, refreshing, item, textToPost} = this.state;

    return (
      <View style={[AppStyles.flex1]}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }>
          <ModalLoader visible={isLoading || comment.fetching} />
          <CustomHeader onBack={() => navigation.pop()} />

          <Comment item={item} />
          <View style={[AppStyles.borderTop7]} />

          {getComments.fetching && <Loader style={[AppStyles.container]} />}
          <FlatList
            data={rootComments[item.id]}
            keyExtractor={(item, idx) => item + idx}
            renderItem={({item}) => <Comment item={item} />}
          />
        </ScrollView>

        <View
          style={[
            AppStyles.section,
            AppStyles.sectionVerticalBase,
            AppStyles.justifyEnd,
            AppStyles.shadow,
          ]}>
          <View
            style={[
              AppStyles.row,
              AppStyles.alignEnd,
              AppStyles.justifyBetween,
            ]}>
            {currentUser && currentUser.photoURL ? (
              <CustomImage
                source={{uri: currentUser.photoURL}}
                style={[
                  AppStyles.avatarMedium,
                  AppStyles.borderCircle,
                  AppStyles.border3,
                ]}
                imageStyle={AppStyles.borderCircle}
              />
            ) : (
              <IconUserDefault
                width={Metrics.avatars.medium}
                height={Metrics.avatars.medium}
              />
            )}
            <TextInput
              editable={currentUser != null}
              value={textToPost}
              placeholder={
                currentUser != null
                  ? I18n.t('commentPlaceholder')
                  : I18n.t('loginFirst')
              }
              multiline={true}
              maxLength={MAX_LENGTH}
              onChangeText={text => this.setState({textToPost: text})}
              style={[
                Fonts.style.large,
                AppStyles.flex1,
                AppStyles.baseMarginLeft,
              ]}
            />
            <TouchableOpacity
              onPress={this.onSubmitPress}
              style={[
                AppStyles.section,
                AppStyles.sectionVerticalBase,
                AppStyles.borderCircle,
                AppStyles.darkShadow,
                AppStyles.baseMarginLeft,
              ]}>
              <Text style={[Fonts.style.medium]}>{I18n.t('berage')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  comment: state.post.comment,
  getComments: state.post.getComments,
  rootComments: state.post.rootComments,
});

const mapDispatchToProps = dispatch => ({
  commentRequest: (data, callback) =>
    dispatch(PostActions.commentRequest(data, callback)),
  getCommentsRequest: (data, callback) =>
    dispatch(PostActions.getCommentsRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsScreen);
