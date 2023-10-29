import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeColors} from './theme';

export default function FormItem() {
  return (
    <TouchableOpacity
      style={{padding: 15, borderBottomWidth: 2, borderBottomColor: '#e8e8e8'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: themeColors.white,
            backgroundColor: themeColors.primaryColor2,
            padding: 5,
            borderRadius: 10,
            fontStyle: 'italic',
          }}>
          Emergency
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: themeColors.primaryColor,
            fontStyle: 'italic',
          }}>
          Date: 29/10/2023
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: themeColors.primaryColor4,
          }}>
          Garage ABCDEF
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: themeColors.primaryColor7,
          }}>
          PRICE: 100000 VND
        </Text>
      </View>
    </TouchableOpacity>
  );
}
