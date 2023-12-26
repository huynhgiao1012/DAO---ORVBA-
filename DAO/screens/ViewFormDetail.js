import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../common/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useGetUserDetailMutation} from '../services/User';
import {useNavigation} from '@react-navigation/native';
import Header2 from '../common/Header2';

export default function ViewFormDetail({route}) {
  const {item} = route.params;
  const navigation = useNavigation();
  const [getUserDetail] = useGetUserDetailMutation();
  const [data, setData] = useState({
    _id: '',
    email: '',
    isActive: false,
    name: '',
    phone: '',
    role: '',
    img: '',
  });
  useEffect(() => {
    getUserDetail()
      .unwrap()
      .then(payload =>
        setData(data => ({
          ...data,
          ...payload.data,
        })),
      )
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  }, []);
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Header2 name="View Form" />
      <View
        style={{
          backgroundColor: themeColors.white,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderBottomWidth: 3,
          borderStyle: 'dotted',
          borderBottomColor: themeColors.primaryColor,
          marginBottom: 15,
          width: '100%',
        }}>
        {/* Customer detail */}
        <Text style={styles.title}>Customer's Information</Text>
        <View style={styles.part}>
          <View style={styles.info}>
            <Icon name="dot-circle" color={themeColors.primaryColor2} />
            <Text style={styles.value}>{item.customerName}</Text>
          </View>
          <View style={styles.info}>
            <Icon name="dot-circle" color={themeColors.primaryColor2} />
            <Text style={styles.value}>{item.phone}</Text>
          </View>
          <View style={styles.info}>
            <Icon name="dot-circle" color={themeColors.primaryColor2} />
            <Text style={styles.value}>{item.address}</Text>
          </View>
        </View>
        <Text style={styles.title}>Mechanic's Information</Text>
        <View
          style={[
            styles.part,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <View style={{width: '50%'}}>
            <View style={styles.info}>
              <Icon
                name="plus-circle"
                color={themeColors.primaryColor6}
                size={16}
              />
              <Text style={styles.value2}>{data.name}</Text>
            </View>
            <View style={styles.info}>
              <Icon
                name="plus-circle"
                color={themeColors.primaryColor6}
                size={16}
              />
              <Text style={styles.value2}>{data.phone}</Text>
            </View>
          </View>
          <View
            style={{
              width: '50%',
              backgroundColor: themeColors.primaryColor5,
              padding: 6,
              borderRadius: 10,
            }}>
            <Text style={styles.value2}>{data.email}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: themeColors.primaryColor,
          borderTopRightRadius: 100,
          padding: 15,
        }}>
        <Text style={[styles.title, {color: themeColors.white, fontSize: 20}]}>
          Form's Information
        </Text>
      </View>
      <View style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <View style={{width: '45%'}}>
            <Text style={styles.label}>Before repairing</Text>
            <Image
              source={{uri: item.imgBf}}
              style={{width: '100%', height: 150, borderRadius: 20}}
            />
          </View>
          <View style={{width: '45%'}}>
            <Text style={styles.label}>After repairing</Text>
            <Image
              source={{uri: item.imgAf}}
              style={{width: '100%', height: 150, borderRadius: 20}}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.title2}>Automaker</Text>
          <Text style={styles.input}>{item.automaker}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title2}>Date</Text>
          <Text style={styles.input}>
            {item.date.split('-').reverse().join('-')}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title2}>Time</Text>
          <Text style={styles.input}>{item.time}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title2}>Service</Text>
          <Text style={styles.input}>{item.service}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title2}>CarSpares</Text>
          {item.carSpares.length > 0 ? (
            item.carSpares.map((val, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    color: themeColors.primaryColor7,
                    fontWeight: '600',
                    fontSize: 15,
                    marginVertical: 5,
                    padding: 10,
                    borderRadius: 10,
                    fontStyle: 'italic',
                  }}>
                  # {val}
                </Text>
              );
            })
          ) : (
            <Text style={styles.input}>No car spares</Text>
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.title2}>Note</Text>
          <Text style={styles.input}>{item.note}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text
            style={[
              styles.title2,
              {fontSize: 26, color: themeColors.primaryColor4},
            ]}>
            PRICE :
          </Text>
          <Text
            style={[
              styles.input,
              {
                backgroundColor: themeColors.primaryColor4,
                color: themeColors.white,
                marginLeft: 10,
              },
            ]}>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(item.price)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    color: themeColors.primaryColor4,
    fontWeight: 'bold',
    fontSize: 18,
  },
  title2: {
    color: themeColors.primaryColor2,
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    marginBottom: 15,
  },
  input: {
    color: themeColors.primaryColor7,
    fontWeight: '600',
    fontSize: 16,
    backgroundColor: '#f8f8f8',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5,
    width: '90%',
  },
  value: {
    color: themeColors.primaryColor7,
    fontWeight: '700',
    fontSize: 14,
    fontStyle: 'italic',
    marginLeft: 5,
  },
  value2: {
    color: themeColors.black,
    fontWeight: '500',
    fontSize: 14,
    fontStyle: 'italic',
    marginLeft: 8,
  },
  part: {
    width: '100%',
    borderRadius: 15,
    paddingVertical: 10,
  },
  label: {
    fontSize: 15,
    color: themeColors.primaryColor2,
    textAlign: 'center',
    fontWeight: '600',
    fontStyle: 'italic',
    marginBottom: 10,
  },
});
