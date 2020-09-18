import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import './App/Config/ReactotronConfig';
import {AppRegistry} from 'react-native';
import App from './App/Containers/App';

// AppRegistry.registerComponent('berage', () => gestureHandlerRootHOC(App));
AppRegistry.registerComponent('berage', () => App);
