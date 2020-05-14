import firebase from '@react-native-firebase/app';

const REGION = 'asia-east2';

export async function httpsCallable(functionName, params = {}) {
  console.tron.log({functionName});

  // return await functions().httpsCallable(functionName)(params);  //didn't work with region
  return await firebase
    .app()
    .functions(REGION)
    .httpsCallable(functionName)(params);
}
