/* eslint-disable curly */
import * as React from 'react';
import {BackHandler, Platform} from 'react-native';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer,
} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
import AppNavigation from './AppNavigation';

import NavigationService from '../Services/NavigationService';

export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'root',
);

const ReduxAppNavigator = createReduxContainer(AppNavigation, 'root');

class ReduxNavigation extends React.Component {
  componentDidMount() {
    if (Platform.OS === 'ios') return;
    BackHandler.addEventListener('hardwareBackPress', () => {
      const {dispatch, nav} = this.props;
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (
        nav.routes.length === 1 &&
        nav.routes[0].routeName === 'LaunchScreen'
      ) {
        return false;
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({type: 'Navigation/BACK'});
      return true;
    });
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') return;
    BackHandler.removeEventListener('hardwareBackPress', undefined);
  }

  render() {
    return (
      <ReduxAppNavigator
        dispatch={this.props.dispatch}
        state={this.props.nav}
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});
export default connect(mapStateToProps)(ReduxNavigation);
