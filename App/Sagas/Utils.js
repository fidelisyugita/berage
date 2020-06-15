import firebase from '@react-native-firebase/app';
import {REGION} from './Consts';

export async function httpsCallable(functionName, params) {
  console.tron.log({functionName});

  // return await functions().httpsCallable(functionName)(params);  //didn't work using region
  return await firebase
    .app()
    .functions(REGION)
    .httpsCallable(functionName)(params);
}
