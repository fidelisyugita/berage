import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';

import PlaceActions from '../../Redux/PlaceRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import OverviewPlaces from '../../Components/Place/OverviewPlaces';
import CustomImage from '../../Components/CustomImage';
import LoadingIndicator from '../../Components/LoadingIndicator';

import {images, items} from '../Dummy';

export class ExploreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {getPopularPlacesRequest} = this.props;

    this.setState({isLoading: true});

    getPopularPlacesRequest(null, this.getPopularPlacesCallback);
  }

  getPopularPlacesCallback = result => {
    if (result.ok) {
      console.tron.log({result});
    }
    this.setState({isLoading: false});
  };

  render() {
    const {navigation, getPopularPlaces} = this.props;

    return (
      <ScrollView>
        <View style={[AppStyles.container, AppStyles.section]}>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: Metrics.circleRadius,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: Metrics.marginHorizontal,
            }}>
            <Icon
              name="magnifier"
              size={Metrics.icons.tiny}
              color={Colors.placeholder}
            />
            <TextInput
              style={[
                Fonts.style.medium,
                AppStyles.smallMarginLeft,
                AppStyles.flex1,
              ]}
              placeholder={I18n.t('searchPlaceholder')}
            />
          </View>
        </View>

        <View
          style={{
            ...AppStyles.container,
            // width: Scale(300), //make the image smaller
          }}>
          <Swiper
            // width={Scale(375)} //but swiper bigger
            height={Metrics.images.xl + Metrics.baseMargin}
            autoplay={true}
            loop={true}
            showsButtons={false}
            showsPagination={true}>
            {images.map(image => (
              // <View
              //   key={image}
              //   style={
              //     {
              //       //   marginRight: Metrics.marginHorizontal,
              //     }
              //   }>
              <CustomImage
                key={image}
                source={{uri: image}}
                style={{
                  ...AppStyles.border3,
                  width: '100%',
                  height: Metrics.images.xl,
                }}
              />
              // </View>
            ))}
          </Swiper>
        </View>

        {getPopularPlaces.fetching ? (
          <LoadingIndicator />
        ) : (
          <OverviewPlaces
            title={I18n.t('popular')}
            items={getPopularPlaces.payload}
            onPress={() => console.tron.log({clicked: 'See all'})}
            navigation={navigation}
          />
        )}

        <OverviewPlaces
          title={I18n.t('recommended')}
          items={items}
          onPress={() => console.tron.log({clicked: 'See all'})}
          navigation={navigation}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentUser: state.session.user,
  getPopularPlaces: state.place.getPopularPlaces,
});

const mapDispatchToProps = dispatch => ({
  getPopularPlacesRequest: (data, callback) =>
    dispatch(PlaceActions.getPopularPlacesRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExploreScreen);
