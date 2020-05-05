import {Colors} from '../Themes';
import {Scale} from '../Transforms';

const type = {
  regular: 'Graphik-Regular',
  medium: 'Graphik-Medium',
  semibold: 'Graphik-Semibold',
};

const size = {
  tiny: Scale(8),
  small: Scale(11),
  medium: Scale(14),
  large: Scale(17),
  xl: Scale(20),
};

const style = {
  tiny: {
    fontFamily: type.regular,
    fontSize: size.tiny,
    color: Colors.charcoal,
  },
  small: {
    fontFamily: type.regular,
    fontSize: size.small,
    color: Colors.charcoal,
  },
  medium: {
    fontFamily: type.regular,
    fontSize: size.medium,
    color: Colors.charcoal,
  },
  large: {
    fontFamily: type.regular,
    fontSize: size.large,
    color: Colors.charcoal,
  },
  xl: {
    fontFamily: type.regular,
    fontSize: size.xl,
    color: Colors.charcoal,
  },
  tiny2: {
    fontFamily: type.medium,
    fontSize: size.tiny,
    color: Colors.charcoal,
  },
  small2: {
    fontFamily: type.medium,
    fontSize: size.small,
    color: Colors.charcoal,
  },
  medium2: {
    fontFamily: type.medium,
    fontSize: size.medium,
    color: Colors.charcoal,
  },
  large2: {
    fontFamily: type.medium,
    fontSize: size.large,
    color: Colors.charcoal,
  },
  xl2: {
    fontFamily: type.bold,
    fontSize: size.xl,
    color: Colors.charcoal,
  },
  tiny3: {
    fontFamily: type.semibold,
    fontSize: size.tiny,
    color: Colors.charcoal,
  },
  small3: {
    fontFamily: type.semibold,
    fontSize: size.small,
    color: Colors.charcoal,
  },
  medium3: {
    fontFamily: type.semibold,
    fontSize: size.medium,
    color: Colors.charcoal,
  },
  large3: {
    fontFamily: type.semibold,
    fontSize: size.large,
    color: Colors.charcoal,
  },
  xl3: {
    fontFamily: type.semibold,
    fontSize: size.xl,
    color: Colors.charcoal,
  },
};

export default {
  type,
  size,
  style,
};
