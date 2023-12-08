import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useGetPickedFormsMutation} from '../../services/Mechanic';
import {themeColors} from '../../common/theme';

export default function MeForm() {
  const [getPickedForms] = useGetPickedFormsMutation();
  const [forms, setForms] = useState([]);
  useEffect(() => {
    setForms([]);
    getPickedForms()
      .unwrap()
      .then(payload => {
        console.log(payload.orderForm);
        setForms(prev => [...prev, ...payload.orderForm]);
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <View style={{backgroundColor: themeColors.white}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: themeColors.primaryColor,
          textAlign: 'center',
          margin: 10,
        }}>
        Information Line
      </Text>
    </View>
  );
}
