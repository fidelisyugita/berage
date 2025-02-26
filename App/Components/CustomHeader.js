import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';

const CustomHeader = props => {
  const {
    children,
    containerStyle,
    title,
    onBack,
    renderRight,
    renderTitle,
  } = props;

  return (
    <View style={[AppStyles.row, AppStyles.alignCenter, containerStyle]}>
      <TouchableOpacity onPress={onBack} style={[AppStyles.btnIcon]}>
        <AntDesign
          name="arrowleft"
          size={Metrics.icons.tiny}
          color={Colors.baseText}
        />
      </TouchableOpacity>
      <View style={[AppStyles.alignCenter]}>
        {renderTitle ? (
          renderTitle()
        ) : (
          <Text style={[Fonts.style.xxl]}>{title}</Text>
        )}
      </View>
      <View style={[AppStyles.flex1, AppStyles.alignEnd, AppStyles.section]}>
        {renderRight && renderRight()}
      </View>
    </View>
  );
};

CustomHeader.propTypes = {
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  renderRight: PropTypes.func,
  renderTitle: PropTypes.func,
};

CustomHeader.defaultProps = {
  containerStyle: {},
};

export default CustomHeader;
