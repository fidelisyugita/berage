import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

export default async (
  path = 'places',
  width = 720,
  height = 480,
  cropping = true,
) => {
  try {
    const image = await ImagePicker.openPicker({
      width: width,
      height: height,
      cropping: cropping,
    });
    console.tron.log({image});

    const refPath = `${path}/${image.modificationDate}.jpg`;
    const reference = storage().ref(refPath);
    const uploadResponse = await reference.putFile(image.path);
    console.tron.log({uploadResponse});

    /**
     * TODO
     * - make sure token doesn't bother image to show
     */
    const url = await storage()
      .ref(refPath)
      .getDownloadURL();

    return {...image, uri: url.split('&token')[0]};
  } catch (error) {
    throw error;
  }
};
