import {View, Text, TextInput} from 'react-native';
import React from 'react';
import Header2 from '../../common/Header2';
import {themeColors} from '../../common/theme';

export default function HelpCenter() {
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <Header2 name="Help Center" />
      <View style={{padding: 20}}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: themeColors.primaryColor4,
            marginVertical: 10,
          }}>
          DO YOU NEED ANY SUPPORT ?
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: themeColors.gray60,
            fontStyle: 'italic',
            textAlign: 'justify',
          }}>
          Please provide the information you need assistance by filling out the
          following form
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: themeColors.primaryColor6,
            marginVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 10,
            color: themeColors.primaryColor7,
            fontWeight: '700',
            fontSize: 16,
            backgroundColor: themeColors.white,
          }}
          numberOfLines={5}
          maxLength={200}
        />
      </View>
    </View>
  );
}
