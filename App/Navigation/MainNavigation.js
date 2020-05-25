import {createStackNavigator} from 'react-navigation-stack';

import BottomNav from './BottomNavigation';

import PlaceScreen from '../Containers/Place';
import AddPlaceScreen from '../Containers/Place/AddPlaceScreen';
import MyPlacesScreen from '../Containers/Place/MyPlacesScreen';

import PrivacyPolicyScreen from '../Containers/Profile/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../Containers/Profile/TermsOfServiceScreen';

import ChatScreen from '../Containers/Chat/ChatScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const MainNav = createStackNavigator(
  {
    BottomNav: {screen: BottomNav},

    PlaceScreen: {screen: PlaceScreen},
    AddPlaceScreen: {screen: AddPlaceScreen},
    MyPlacesScreen: {screen: MyPlacesScreen},

    PrivacyPolicyScreen: {screen: PrivacyPolicyScreen},
    TermsOfServiceScreen: {screen: TermsOfServiceScreen},

    ChatScreen: {screen: ChatScreen},
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
