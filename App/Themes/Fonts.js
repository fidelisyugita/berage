import {Scale} from '../Transforms';

const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic',
};

const size = {
  tiny: Scale(8),
  small: Scale(10),
  medium: Scale(12),
  large: Scale(14),
  xl: Scale(16),
};

const style = {
  tiny: {
    fontFamily: type.base,
    fontSize: size.tiny,
  },
  small: {
    fontFamily: type.base,
    fontSize: size.small,
  },
  medium: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
  large: {
    fontFamily: type.base,
    fontSize: size.large,
  },
  xl: {
    fontFamily: type.base,
    fontSize: size.xl,
  },
};

export default {
  type,
  size,
  style,
};
