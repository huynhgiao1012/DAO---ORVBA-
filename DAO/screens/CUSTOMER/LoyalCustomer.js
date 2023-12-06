import {View, Text, Image} from 'react-native';
import React from 'react';
import Header2 from '../../common/Header2';
import {themeColors} from '../../common/theme';

export default function LoyalCustomer() {
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <Header2 name="Loyal Customer" />
      <Image
        source={require('../../assets/award.gif')}
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
          marginVertical: 20,
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          color: themeColors.primaryColor2,
        }}>
        Your current level: STANDARD
      </Text>
    </View>
  );
}
