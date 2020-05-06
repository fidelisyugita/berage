import {Dimensions, Platform} from 'react-native';
import {Scale} from '../Transforms';

const {width, height} = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: Scale(12),
  marginVertical: Scale(14),
  section: Scale(25),
  baseMargin: Scale(10),
  doubleBaseMargin: Scale(20),
  smallMargin: Scale(5),
  doubleSection: Scale(50),
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? Scale(64) : Scale(54),
  buttonRadius: Scale(4),
  imageRadius: Scale(7),
  circleRadius: 50,
  icons: {
    tiny: Scale(20),
    small: Scale(24),
    medium: Scale(28),
    large: Scale(32),
    xl: Scale(36),
  },
  images: {
    small: Scale(20),
    medium: Scale(40),
    large: Scale(60),
  },
  avatars: {
    small: Scale(20),
    medium: Scale(40),
    large: Scale(60),
  },
};

export default metrics;
