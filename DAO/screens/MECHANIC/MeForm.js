import {View, Text, TouchableOpacity, Platform, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useGetPickedFormsMutation} from '../../services/Mechanic';
import {themeColors} from '../../common/theme';
import TopTab2 from '../../common/TopTab2';
import MeForm1 from './MeForm1';
export default function MeForm() {
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderBottomColor: themeColors.primaryColor5,
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            color: themeColors.primaryColor4,
            fontSize: 22,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          Information Line
        </Text>
      </View>
      <MeForm1 />
    </View>
  );
}
