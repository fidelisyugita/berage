import {Colors, Fonts, Metrics} from '../Themes';
import {Scale} from '../Transforms';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  container: {
    marginTop: Metrics.marginVertical,
  },
  section: {
    paddingHorizontal: Metrics.marginHorizontal,
  },
  sectionMargin: {
    marginHorizontal: Metrics.marginHorizontal,
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
  smallMarginLeft: {
    marginLeft: Metrics.smallMargin,
  },
  baseMarginLeft: {
    marginLeft: Metrics.baseMargin,
  },

  border3: {
    borderColor: Colors.steel,
    borderWidth: Scale(0.3),
  },
  border7: {
    borderColor: Colors.steel,
    borderWidth: Scale(0.7),
  },
  borderBottom3: {
    borderColor: Colors.steel,
    borderBottomWidth: Scale(0.3),
  },
  borderBottom7: {
    borderColor: Colors.steel,
    borderBottomWidth: Scale(0.7),
  },
};

export default ApplicationStyles;
