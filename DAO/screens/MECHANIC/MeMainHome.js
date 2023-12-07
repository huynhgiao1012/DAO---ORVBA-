import {View, Text, Image} from 'react-native';
import React from 'react';
import {themeColors} from '../../common/theme';

export default function MeMainHome() {
  return (
    <View style={{flex: 1, backgroundColor: themeColors.white}}>
      <View>
        <Image
          source={require('../../assets/bg5.png')}
          style={{width: '100%', height: 230}}
        />
      </View>
    </View>
  );
}
