import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import LaunchScreen from '../Containers/LaunchScreen';
import MainNav from './MainNavigation';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = createSwitchNavigator(
  {
    Splash: LaunchScreen,
    // Auth: AuthStack,
    Main: MainNav,
  },
  {
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(PrimaryNav);
