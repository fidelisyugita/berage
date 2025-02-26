import {createStackNavigator} from 'react-navigation-stack';

import BottomNav from './BottomNavigation';

import PlaceScreen from '../Containers/Place';
import AddPlaceScreen from '../Containers/Place/AddPlaceScreen';
import MyPlacesScreen from '../Containers/Place/MyPlacesScreen';
import OnlineUsersScreen from '../Containers/Place/OnlineUsersScreen';
import CommentsScreen from '../Containers/Place/CommentsScreen';

import SetBannerScreen from '../Containers/Profile/SetBannerScreen';
import AddBannerScreen from '../Containers/Profile/AddBannerScreen';
import SendNotifScreen from '../Containers/Profile/SendNotifScreen';
import PrivacyPolicyScreen from '../Containers/Profile/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../Containers/Profile/TermsOfServiceScreen';

import ChatScreen from '../Containers/Chat/ChatScreen';

import SearchPlaceScreen from '../Containers/Explore/SearchPlaceScreen';
import ListPlaceScreen from '../Containers/Explore/ListPlaceScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const MainNav = createStackNavigator(
  {
    BottomNav: {screen: BottomNav},

    PlaceScreen: {screen: PlaceScreen},
    AddPlaceScreen: {screen: AddPlaceScreen},
    MyPlacesScreen: {screen: MyPlacesScreen},
    OnlineUsersScreen: {screen: OnlineUsersScreen},
    CommentsScreen: {screen: CommentsScreen},

    SetBannerScreen: {screen: SetBannerScreen},
    AddBannerScreen: {screen: AddBannerScreen},
    SendNotifScreen: {screen: SendNotifScreen},
    PrivacyPolicyScreen: {screen: PrivacyPolicyScreen},
    TermsOfServiceScreen: {screen: TermsOfServiceScreen},

    ChatScreen: {screen: ChatScreen},

    SearchPlaceScreen: {screen: SearchPlaceScreen},
    ListPlaceScreen: {screen: ListPlaceScreen},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'BottomNav',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

export default MainNav;
