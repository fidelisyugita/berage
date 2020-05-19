import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Text, View, Modal} from 'react-native';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';

import EmptyState from '../EmptyState';

const ModalLoader = props => {
  const {
    children,
    containerStyle,
    visible,
    onClose,
    imageSource,
    title,
    message,
  } = props;

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View
        style={[
          AppStyles.flex1,
          AppStyles.alignCenter,
          AppStyles.justifyCenter,
          {
            backgroundColor: Colors.windowTint,
          },
        ]}>
        <EmptyState
          containerStyle={containerStyle}
          imageSource={imageSource}
          title={title}
          message={message}
        />
      </View>
    </Modal>
  );
};

ModalLoader.propTypes = {
  containerStyle: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageSource: PropTypes.object.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};

ModalLoader.defaultProps = {
  containerStyle: {
    maxWidth: Metrics.screenWidth - Metrics.doubleBaseMargin,
    backgroundColor: Colors.background,
  },
  visible: false,
  imageSource: Images.loader,
};

export default ModalLoader;
