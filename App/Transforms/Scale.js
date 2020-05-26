import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const DESIGN_WIDTH = 375;

export default size => {
  return (width / DESIGN_WIDTH) * size;
};
