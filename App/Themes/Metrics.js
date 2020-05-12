import {Dimensions, Platform} from 'react-native';
import {Scale} from '../Transforms';

const {width, height} = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: Scale(14),
  marginVertical: Scale(16),
  section: Scale(25),
  baseMargin: Scale(10),
  doubleBaseMargin: Scale(20),
  smallMargin: Scale(5),
  tinyMargin: Scale(2),
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
    tiny: Scale(80),
    small: Scale(110),
    medium: Scale(140),
    large: Scale(170),
    xl: Scale(200),
  },
  avatars: {
    tiny: Scale(20),
    small: Scale(30),
    medium: Scale(40),
    large: Scale(50),
    xl: Scale(60),
  },
};

export default metrics;
