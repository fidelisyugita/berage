import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import LaunchScreen from '../Containers/LaunchScreen';
import MainNav from './MainNavigation';
import MaintenanceScreen from '../Containers/MaintenanceScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = createSwitchNavigator(
  {
    Splash: LaunchScreen,
    // Auth: AuthStack,
    Main: MainNav,
    Maintenance: MaintenanceScreen,
  },
  {
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(PrimaryNav);
