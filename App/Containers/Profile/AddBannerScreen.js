/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
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

import BannerActions from '../../Redux/BannerRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';
import {GetUserCoordinate, UploadImage} from '../../Lib';

import CustomImage from '../../Components/CustomImage';
import Loader from '../../Components/Loader';
import {DropDownHolder} from '../../Components/DropDownHolder';
import CustomHeader from '../../Components/CustomHeader';

export class AddBannerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      image: null,
      title: '',
      url: '',
      description: '',
    };
  }

  componentDidMount() {
    const {navigation, userLocation} = this.props;
  }

  addImage = async () => {
    try {
      const image = await UploadImage('banners', Scale(750), Scale(460));
      console.tron.log({image});
      this.setState({image});
    } catch (error) {
      console.tron.log({error});
      // DropDownHolder.alert(
      //   'error',
      //   I18n.t('errorDefault'),
      //   error.message || I18n.t('tryAgain'),
      // );
    }
  };

  onSavePress = () => {
    const {image, title, url, description} = this.state;
    const {addBannerRequest} = this.props;

    if (
      !image ||
      title.length < 1 ||
      url.length < 1 ||
      description.length < 1
    ) {
      DropDownHolder.alert('warn', I18n.t('fieldsRequired'), undefined);
      return;
    }

    this.setState({isLoading: true});

    const data = {
      image: image
        ? {
            uri: image.uri,
            refPath: image.refPath,
          }
        : null,
      title,
      url: url.startsWith('http') ? url : `http://${url}`,
      description,
    };

    console.tron.log({data});

    addBannerRequest(data, this.addBannerCallback);
  };

  addBannerCallback = result => {
    const {navigation} = this.props;

    this.setState({isLoading: false});
    if (result.ok) {
      console.tron.log({result});
      navigation.pop();
    }
  };

  renderImage() {
    const {image} = this.state;

    return (
      <View>
        {image ? (
          <CustomImage
            key={image.modificationDate}
            source={{uri: image.path || image.uri}}
            style={styles.inputImage}
            imageStyle={AppStyles.borderImage}
          />
        ) : (
          <TouchableHighlight
            underlayColor={Colors.highlightUnderlay}
            onPress={this.addImage}
            style={[
              AppStyles.containerBottom,
              AppStyles.sectionVerticalBase,
              AppStyles.alignCenter,
              AppStyles.borderImage,
              AppStyles.border7,
              AppStyles.darkShadowSmall,
            ]}>
            <View>
              <CustomImage
                source={Images.homeLoader}
                style={AppStyles.imageXl}
              />
              <AntDesign
                name="pluscircle"
                size={Metrics.icons.xl}
                color={Colors.border}
                style={{
                  ...AppStyles.btnIcon,
                  position: 'absolute',
                  left: Scale(140),
                  top: Scale(140),
                }}
              />
            </View>
          </TouchableHighlight>
        )}
      </View>
    );
  }

  render() {
    const {navigation, currentUser} = this.props;
    const {isLoading, image, title, url, description} = this.state;

    return (
      <ScrollView>
        <CustomHeader onBack={() => navigation.pop()} />
        <View style={[AppStyles.container, AppStyles.section]}>
          {this.renderImage()}
          <TextInput
            value={title}
            placeholder={I18n.t('title')}
            onChangeText={text => this.setState({title: text})}
            style={styles.inputText}
          />
          <TextInput
            value={url}
            placeholder={I18n.t('url')}
            onChangeText={text => this.setState({url: text})}
            style={styles.inputText}
          />
          <TextInput
            value={description}
            multiline={true}
            numberOfLines={3}
            placeholder={I18n.t('description')}
            onChangeText={text => this.setState({description: text})}
            style={styles.inputText}
          />

          {isLoading ? (
            <Loader style={[AppStyles.topSpace, AppStyles.bottomSpace]} />
          ) : (
            <TouchableHighlight
              underlayColor={Colors.highlightUnderlay}
              onPress={this.onSavePress}
              style={styles.btnSave}>
              <Text style={[Fonts.style.xl]}>{I18n.t('save')}</Text>
            </TouchableHighlight>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputImage: {
    ...AppStyles.containerBottom,
    ...AppStyles.borderImage,
    ...AppStyles.border5,
    ...AppStyles.darkShadowSmall,
    height: Metrics.images.xl,
    width: '100%',
  },
  inputText: {
    ...AppStyles.borderBottom7,
    ...Fonts.style.medium,
    ...Fonts.style.alignBottom,
  },
  btnSave: {
    ...AppStyles.topSpace,
    ...AppStyles.bottomSpace,
    ...AppStyles.sectionVerticalBase,
    ...AppStyles.alignCenter,
    ...AppStyles.border7,
    ...AppStyles.borderImage,
    ...AppStyles.darkShadowSmall,
  },
  radioBtn: {
    ...AppStyles.flex1,
    ...AppStyles.section,
    ...AppStyles.sectionMargin,
    ...AppStyles.sectionVerticalBase,
    ...AppStyles.smallMarginVertical,
    ...AppStyles.border7,
    ...AppStyles.borderImage,
    ...AppStyles.shadow,
  },
});

const mapStateToProps = state => ({
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  addBannerRequest: (data, callback) =>
    dispatch(BannerActions.addBannerRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBannerScreen);
