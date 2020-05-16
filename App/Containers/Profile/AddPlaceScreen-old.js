import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Text,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {
  Item,
  Input,
  Icon,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Content,
  Toast,
  Label,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';

import PlaceActions from '../../Redux/PlaceRedux';
import AuthActions from '../../Redux/AuthRedux';

import I18n from '../../I18n';
import {Colors, Fonts, Images, Metrics, ApplicationStyles} from '../../Themes';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const metadata = {
  contentType: 'image/jpeg',
};
const storageRef = firebase.storage().ref();

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      uploading: false,
      progress: 0,
      photos: [
        {
          uri: null,
          path: null,
          downloadURL: null,
        },
        {
          uri: null,
          path: null,
          downloadURL: null,
        },
        {
          uri: null,
          path: null,
          downloadURL: null,
        },
        {
          uri: null,
          path: null,
          downloadURL: null,
        },
        {
          uri: null,
          path: null,
          downloadURL: null,
        },
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.tron.log({nextProps});
  }

  getPicture(index) {
    ImagePicker.showImagePicker(options, response => {
      console.tron.log({'ImagePicker Response': response});

      if (response.didCancel) {
        console.tron.log('User cancelled image picker');
      } else if (response.error) {
        console.tron.error({'ImagePicker Error': response.error});
      } else {
        let {photos} = this.state;
        photos[index] = {
          uri: response.uri,
          path: response.path,
          downloadURL: null,
        };
        this.setState({photos}, () => this.uploadImage(index));
      }
    });
  }

  uploadImage(index) {
    let {photos} = this.state;
    console.tron.log(`uploadImage ${index}`, photos[index]);
    const filename = `${new Date().getTime()}.jpg`;

    this.setState({uploading: true});
    firebase
      .storage()
      .ref(`place/${filename}`)
      .putFile(photos[index].path)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.tron.log({snapshot});
          let state = {};
          state = {
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100, // Calculate progress percentage
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            photos[index] = {
              uri: photos[index].uri,
              path: photos[index].path,
              downloadURL: `${
                snapshot.downloadURL.split('.jpg')[0]
              }_800x800.jpg?alt=media`,
            };
            console.tron.log(`uploadedImage ${index}`, photos[index]);
            state = {
              uploading: false,
              progress: 0,
              photos,
            };
          }
          this.setState(state);
        },
        error => {
          console.tron.error({error});
          this.setState({
            uploading: false,
            progress: 0,
            photos,
          });
          Toast.show({
            text: I18n.t('tryAgain'),
            buttonText: 'Okay',
          });
        },
      );
  }

  async openCamera(index = 0) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getPicture(index);
      } else {
        console.tron.log('Camera permission denied');
        Toast.show({
          text: I18n.t('cameraPermissionDenied'),
          buttonText: 'Okay',
        });
      }
    } catch (err) {
      console.tron.warn(err);
    }
  }

  renderPhotos() {
    const {uploading, progress, photos} = this.state;

    return (
      <View style={ApplicationStyles.screen.section}>
        {uploading && (
          <View
            style={{
              backgroundColor: Colors.facebook,
              height: 3,
              shadowColor: '#000',
              width: `${progress}%`,
            }}
          />
        )}

        <ScrollView horizontal>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => this.openCamera(0)}>
            <Image
              source={
                photos[0].downloadURL ? {uri: photos[0].uri} : Images.logo
              }
              resizeMode="cover"
              style={{width: 150, height: 100}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => this.openCamera(1)}>
            <Image
              source={
                photos[1].downloadURL ? {uri: photos[1].uri} : Images.logo
              }
              resizeMode="cover"
              style={{width: 150, height: 100}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => this.openCamera(2)}>
            <Image
              source={
                photos[2].downloadURL ? {uri: photos[2].uri} : Images.logo
              }
              resizeMode="cover"
              style={{width: 150, height: 100}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => this.openCamera(3)}>
            <Image
              source={
                photos[3].downloadURL ? {uri: photos[3].uri} : Images.logo
              }
              resizeMode="cover"
              style={{width: 150, height: 100}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => this.openCamera(4)}>
            <Image
              source={
                photos[4].downloadURL ? {uri: photos[4].uri} : Images.logo
              }
              resizeMode="cover"
              style={{width: 150, height: 100}}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  render() {
    const {isLoading, uploading, progress, photos} = this.state;
    const {user, navigation} = this.props;

    return (
      <ScrollView style={ApplicationStyles.screen.container}>
        {this.renderPhotos()}

        <View style={ApplicationStyles.screen.section}>
          <Item stackedLabel>
            <Label>Place name</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Catagories</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Place name</Label>
            <Input />
          </Item>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.session.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginWithGoogle: () => dispatch(AuthActions.loginWithGoogleRequest()),
    logoutWithGoogle: () => dispatch(AuthActions.logoutWithGoogleRequest()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
