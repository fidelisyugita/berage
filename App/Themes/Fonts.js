import {Colors} from '../Themes';
import {Scale} from '../Transforms';

const type = {
  regular: 'Graphik-Regular',
  medium: 'Graphik-Medium',
  semibold: 'Graphik-Semibold',
};

const size = {
  tiny: Scale(10),
  small: Scale(12),
  medium: Scale(14),
  large: Scale(16),
  xl: Scale(18),
  xxl: Scale(20),
  xxxl: Scale(22),
};

const style = {
  alignTop: {
    textAlignVertical: 'top',
  },
  alignBottom: {
    textAlignVertical: 'bottom',
  },
  alignJustify: {
    textAlign: 'justify',
  },
  linkColor: {
    color: Colors.link,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  lowercase: {
    textTransform: 'lowercase',
  },
  tiny: {
    fontFamily: type.regular,
    fontSize: size.tiny,
    color: Colors.baseText,
  },
  small: {
    fontFamily: type.regular,
    fontSize: size.small,
    color: Colors.baseText,
  },
  medium: {
    fontFamily: type.regular,
    fontSize: size.medium,
    color: Colors.baseText,
  },
  large: {
    fontFamily: type.regular,
    fontSize: size.large,
    color: Colors.baseText,
  },
  xl: {
    fontFamily: type.regular,
    fontSize: size.xl,
    color: Colors.baseText,
  },
  xxl: {
    fontFamily: type.regular,
    fontSize: size.xxl,
    color: Colors.baseText,
  },
  xxxl: {
    fontFamily: type.regular,
    fontSize: size.xxxl,
    color: Colors.baseText,
  },
  tiny2: {
    fontFamily: type.medium,
    fontSize: size.tiny,
    color: Colors.baseText,
  },
  small2: {
    fontFamily: type.medium,
    fontSize: size.small,
    color: Colors.baseText,
  },
  medium2: {
    fontFamily: type.medium,
    fontSize: size.medium,
    color: Colors.baseText,
  },
  large2: {
    fontFamily: type.medium,
    fontSize: size.large,
    color: Colors.baseText,
  },
  xl2: {
    fontFamily: type.medium,
    fontSize: size.xl,
    color: Colors.baseText,
  },
  xxl2: {
    fontFamily: type.medium,
    fontSize: size.xxl,
    color: Colors.baseText,
  },
  xxx2: {
    fontFamily: type.medium,
    fontSize: size.xxxl,
    color: Colors.baseText,
  },
  tiny3: {
    fontFamily: type.semibold,
    fontSize: size.tiny,
    color: Colors.baseText,
  },
  small3: {
    fontFamily: type.semibold,
    fontSize: size.small,
    color: Colors.baseText,
  },
  medium3: {
    fontFamily: type.semibold,
    fontSize: size.medium,
    color: Colors.baseText,
  },
  large3: {
    fontFamily: type.semibold,
    fontSize: size.large,
    color: Colors.baseText,
  },
  xl3: {
    fontFamily: type.semibold,
    fontSize: size.xl,
    color: Colors.baseText,
  },
  xxl3: {
    fontFamily: type.semibold,
    fontSize: size.xxl,
    color: Colors.baseText,
  },
  xxxl3: {
    fontFamily: type.semibold,
    fontSize: size.xxxl,
    color: Colors.baseText,
  },
};

export default {
  type,
  size,
  style,
};
