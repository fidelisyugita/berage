import {Colors, Fonts, Metrics} from '../Themes';
import {Scale} from '../Transforms';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  container: {
    marginTop: Metrics.marginVertical,
  },
  containerSmall: {
    marginTop: Metrics.smallMargin,
  },
  containerTiny: {
    marginTop: Metrics.tinyMargin,
  },
  containerBottom: {
    marginBottom: Metrics.marginVertical,
  },
  section: {
    paddingHorizontal: Metrics.marginHorizontal,
  },
  sectionMargin: {
    marginHorizontal: Metrics.marginHorizontal,
  },
  sectionVertical: {
    paddingVertical: Metrics.marginVertical,
  },
  sectionVerticalSmall: {
    paddingVertical: Metrics.smallMargin,
  },
  bottomSpace: {
    marginBottom: Metrics.doubleBaseMargin,
  },
  row: {
    flexDirection: 'row',
  },
  borderImage: {
    borderRadius: Metrics.imageRadius,
  },
  borderTopImage: {
    borderTopLeftRadius: Metrics.imageRadius,
    borderTopRightRadius: Metrics.imageRadius,
  },
  borderBottomImage: {
    borderBottomLeftRadius: Metrics.imageRadius,
    borderBottomRightRadius: Metrics.imageRadius,
  },
  borderCircle: {
    borderRadius: Metrics.circleRadius,
  },
  avatarMedium: {
    width: Metrics.avatars.medium,
    height: Metrics.avatars.medium,
  },
  avatarLarge: {
    width: Metrics.avatars.large,
    height: Metrics.avatars.large,
  },
  baseMarginVertical: {
    marginVertical: Metrics.baseMargin,
  },
  smallMarginVertical: {
    marginVertical: Metrics.smallMargin,
  },
  baseMarginRight: {
    marginRight: Metrics.baseMargin,
  },
  baseMarginLeft: {
    marginLeft: Metrics.baseMargin,
  },
  smallMarginLeft: {
    marginLeft: Metrics.smallMargin,
  },
  tinyMarginLeft: {
    marginLeft: Metrics.tinyMargin,
  },
  minWidth1: {
    minWidth: Metrics.screenWidth / 1,
  },
  minWidth2: {
    minWidth: Metrics.screenWidth / 2,
  },
  minWidth3: {
    minWidth: Metrics.screenWidth / 3,
  },
  maxWidth1: {
    maxWidth: Metrics.screenWidth / 1,
  },
  maxWidth2: {
    maxWidth: Metrics.screenWidth / 2,
  },
  maxWidth3: {
    maxWidth: Metrics.screenWidth / 3,
  },
  shadow: {
    backgroundColor: Colors.backgroundShadow,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  alignCenter: {
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },

  border3: {
    borderColor: Colors.border,
    borderWidth: Scale(0.3),
  },
  border7: {
    borderColor: Colors.border,
    borderWidth: Scale(0.7),
  },
  borderBottom3: {
    borderColor: Colors.border,
    borderBottomWidth: Scale(0.3),
  },
  borderBottom5: {
    borderColor: Colors.border,
    borderBottomWidth: Scale(0.5),
  },
  borderBottom7: {
    borderColor: Colors.border,
    borderBottomWidth: Scale(0.7),
  },
  borderTop3: {
    borderColor: Colors.border,
    borderTopWidth: Scale(0.3),
  },
  borderTop5: {
    borderColor: Colors.border,
    borderTopWidth: Scale(0.5),
  },
  borderTop7: {
    borderColor: Colors.border,
    borderTopWidth: Scale(0.7),
  },
};

export default ApplicationStyles;
