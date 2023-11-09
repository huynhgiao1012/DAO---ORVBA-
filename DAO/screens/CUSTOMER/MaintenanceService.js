import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeColors} from '../../common/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListScreen2 from './ListScreen2';

export default function MaintenanceService() {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: themeColors.white,
        }}>
        <TouchableOpacity>
          <Icon name="angle-left" size={35} color={themeColors.primaryColor} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '800',
            color: themeColors.primaryColor,
            marginLeft: 20,
          }}>
          Maintenance Service
        </Text>
      </View>
      <ListScreen2 />
    </View>
  );
}
