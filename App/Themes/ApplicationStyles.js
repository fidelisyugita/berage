import {Colors, Fonts, Metrics} from '../Themes';
import {Scale} from '../Transforms';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  container: {
    marginTop: Metrics.marginVertical,
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
  baseMarginVertical: {
    marginVertical: Metrics.baseMargin,
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
  shadow: {
    backgroundColor: Colors.silver,
    shadowColor: Colors.charcoal,
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
    borderColor: Colors.frost,
    borderWidth: Scale(0.3),
  },
  border7: {
    borderColor: Colors.frost,
    borderWidth: Scale(0.7),
  },
  borderBottom3: {
    borderColor: Colors.frost,
    borderBottomWidth: Scale(0.3),
  },
  borderBottom7: {
    borderColor: Colors.frost,
    borderBottomWidth: Scale(0.7),
  },
  borderTop3: {
    borderColor: Colors.frost,
    borderTopWidth: Scale(0.3),
  },
  borderTop5: {
    borderColor: Colors.frost,
    borderTopWidth: Scale(0.5),
  },
  borderTop7: {
    borderColor: Colors.frost,
    borderTopWidth: Scale(0.7),
  },
};

export default ApplicationStyles;
