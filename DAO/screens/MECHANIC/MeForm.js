import {View, Text, TouchableOpacity, Platform, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useGetPickedFormsMutation} from '../../services/Mechanic';
import {themeColors} from '../../common/theme';
import {FlatList} from 'react-native';
export default function MeForm() {
  const [getPickedForms] = useGetPickedFormsMutation();
  const [forms, setForms] = useState([]);
  const navigation = useNavigation();
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
  const openDialScreen = num => {
    if (Platform.OS === 'ios') {
      number = `telprompt:${num}`;
    } else {
      number = `tel:${num}`;
    }
    Linking.openURL(number);
  };
  const renderItem = ({item}) => (
    <View
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: themeColors.primaryColor5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{width: '80%'}}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: themeColors.black,
            fontStyle: 'italic',
          }}>
          Name: {item.customerName}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: themeColors.black,
            fontStyle: 'italic',
          }}>
          Current Address: {item.address}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: themeColors.black,
            fontStyle: 'italic',
          }}>
          Phone: {item.phone}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: themeColors.primaryColor4,
          }}>
          Service - {item.service}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: themeColors.primaryColor4,
          }}>
          Estimated Price - {item.price} VND
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => openDialScreen(item.phone)}
          style={{
            backgroundColor: themeColors.primaryColor4,
            padding: 10,
            borderRadius: 10,
            marginVertical: 5,
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
            Contact
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateForm', {id: item._id})}
          style={{
            backgroundColor: themeColors.primaryColor7,
            padding: 10,
            borderRadius: 10,
            marginVertical: 5,
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={{backgroundColor: themeColors.white}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: themeColors.primaryColor,
          textAlign: 'center',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: themeColors.primaryColor5,
        }}>
        Information Line
      </Text>
      {forms && (
        <FlatList
          data={forms}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
}
