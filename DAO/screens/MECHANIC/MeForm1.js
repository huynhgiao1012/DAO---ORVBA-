import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useGetPickedFormsMutation} from '../../services/Mechanic';
import {themeColors} from '../../common/theme';
import {FlatList} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
export default function MeForm({route}) {
  const [getPickedForms, {isLoading}] = useGetPickedFormsMutation();
  const [forms, setForms] = useState([]);
  const [status, setStatus] = useState('process');
  const data = ['process', 'holding'];
  const navigation = useNavigation();
  const loadData = () => {
    if (status === 'process') {
      getPickedForms()
        .unwrap()
        .then(payload => {
          setForms(prev => [...prev, ...payload.orderForm]);
        })
        .catch(error => console.log(error));
    }
  };
  useEffect(() => {
    setForms([]);
    loadData();
  }, []);
  useEffect(() => {
    setForms([]);
    loadData();
  }, [route]);
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
      style={[
        {
          borderBottomWidth: 1,
          borderBottomColor: themeColors.primaryColor5,
          backgroundColor: themeColors.white,
          margin: 10,
          borderRadius: 10,
        },
        {
          elevation: 5,
          shadowColor: themeColors.black,
          margin: 10,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: themeColors.primaryColor,
          padding: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: themeColors.white,
          }}>
          {item.service}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: themeColors.white,
          }}>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(item.price)}
        </Text>
      </View>
      <View style={{marginVertical: 10, paddingHorizontal: 10}}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: themeColors.primaryColor2,
            fontStyle: 'italic',
          }}>
          Name: {item.customerName}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: themeColors.primaryColor2,
            fontStyle: 'italic',
          }}>
          Current Address: {item.address}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: themeColors.primaryColor2,
            fontStyle: 'italic',
          }}>
          Phone: {item.phone}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => openDialScreen(item.phone)}
          style={{
            backgroundColor: themeColors.primaryColor6,
            padding: 10,
            borderRadius: 10,
            marginVertical: 5,
            width: '40%',
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
            Contact
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateForm', {id: item._id})}
          style={{
            backgroundColor: themeColors.primaryColor4,
            padding: 10,
            borderRadius: 10,
            marginVertical: 5,
            width: '50%',
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
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      {isLoading && (
        <Modal isVisible={true} transparent={true}>
          <View
            style={{
              backgroundColor: '#000000aa',
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: '90%',
                alignSelf: 'center',
              }}>
              <ActivityIndicator size={40} color={themeColors.primaryColor} />
            </View>
          </View>
        </Modal>
      )}
      <SelectDropdown
        buttonStyle={{
          width: '95%',
          backgroundColor: themeColors.primaryColor,
          borderRadius: 10,
          marginHorizontal: 10,
          marginVertical: 20,
        }}
        buttonTextStyle={{
          color: themeColors.white,
          fontWeight: '700',
          fontSize: 18,
        }}
        defaultValue={data[0]}
        data={data}
        onSelect={(selectedItem, index) => {
          setStatus(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.toUpperCase();
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
      {forms ? (
        <FlatList
          data={forms}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <Text
          style={{
            color: themeColors.primaryColor7,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          No results
        </Text>
      )}
    </View>
  );
}
