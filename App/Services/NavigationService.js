import {NavigationActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  if (_navigator) {
    // _navigator.props.dispatch(
    //   NavigationActions.navigate({
    //     routeName,
    //     params,
    //   })
    // );
    _navigator.currentNavProp.navigate(routeName, params);
  }
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};
