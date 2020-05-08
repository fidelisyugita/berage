import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View, FlatList} from 'react-native';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';

import Place from './Place';

const OverviewPlaces = props => {
  const {title, items, onPress, navigation} = props;

  return (
    <View style={[AppStyles.containerSmall, AppStyles.section]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={Fonts.style.large3}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={Fonts.style.large3}>{I18n.t('seeAll')}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item, idx) => `${title}-${idx}`}
        renderItem={({item, idx}) => (
          <Place
            item={item}
            onPress={() => navigation.navigate('PlaceScreen', {item})}
          />
        )}
      />
    </View>
  );
};

OverviewPlaces.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

OverviewPlaces.defaultProps = {
  style: {},
};

export default OverviewPlaces;
