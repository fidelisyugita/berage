import {createStackNavigator} from 'react-navigation-stack';

import BottomNav from './BottomNavigation';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const MainNav = createStackNavigator(
  {
    BottomNav: {screen: BottomNav},
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
