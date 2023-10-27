import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeColors} from './theme';

export default function Card() {
  const data = [
    {
      id: 1,
      title: 'Maintanence Process',
      description: '',
      image: require('../assets/process.jpg'),
    },
    {
      id: 2,
      title: '5 Reasons Why You Should Buy Roadside Assistance',
      description: '',
      image: require('../assets/why.jpg'),
    },
  ];
  const renderItem = () => {
    return data.map(val => {
      <View key={val.id}>
        <Text>{val.title}</Text>
      </View>;
    });
  };
  return (
    <View style={{flex: 1}}>
      {data.map(val => {
        return (
          <TouchableOpacity
            key={val.id}
            style={{
              width: '90%',
              marginHorizontal: 20,
              borderWidth: 1,
              borderColor: themeColors.primaryColor5,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              marginVertical: 20,
            }}>
            <Image
              source={val.image}
              style={{
                width: '100%',
                height: 180,
                padding: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <Text
              style={{
                paddingVertical: 10,
                fontSize: 18,
                fontWeight: '700',
                backgroundColor: themeColors.primaryColor6,
                textAlign: 'center',
                color: themeColors.white,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              {val.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
