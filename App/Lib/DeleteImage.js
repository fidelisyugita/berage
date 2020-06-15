/* eslint-disable curly */
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

export default async (refPath = 'test') => {
  if (refPath && refPath.length < 1) return;

  try {
    console.tron.log({refPath});

    const reference = storage().ref(refPath);
    const deleteResponse = await reference.delete();
    console.tron.log({deleteResponse});

    return deleteResponse;
  } catch (error) {
    throw error;
  }
};
