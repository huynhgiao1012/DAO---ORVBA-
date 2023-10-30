import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {themeColors} from '../../common/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import GetLocation from 'react-native-get-location';
import Carousel from '../../common/Carousel';
import Card from '../../common/Card';

import {useNavigation} from '@react-navigation/native';

export default function MainHome() {
  const navigation = useNavigation();
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 10000,
    })
      .then(location => {
        console.log(location);
      })
      .catch(error => {
        return error;
      });
  };
  return (
    <ScrollView style={{backgroundColor: themeColors.white}}>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: themeColors.primaryColor,
            borderBottomLeftRadius: 50,
            borderTopLeftRadius: 50,
            padding: 15,
            flexDirection: 'row',
            alignContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            marginLeft: 30,
          }}>
          <Icon
            name="person-circle-outline"
            size={60}
            color={themeColors.white}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: themeColors.white,
              paddingLeft: 10,
              width: 300,
            }}>
            WELCOME HOME, JONH SMITH !
          </Text>
        </View>
        <View style={{width: '100%', height: 200, alignSelf: 'center'}}>
          <Image
            source={require('../../assets/towing.gif')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View style={{margin: 20}}>
          <Text
            style={{
              color: themeColors.primaryColor4,
              fontWeight: '600',
              fontSize: 18,
              paddingBottom: 10,
            }}>
            Current Location
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Icon2 name="map-marker-alt" size={25} color="red" />
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: themeColors.primaryColor2,
                paddingLeft: 10,
                fontStyle: 'italic',
              }}>
              Dong Thanh Can Giuoc Long An
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: themeColors.primaryColor7,
            fontWeight: '800',
            fontSize: 24,
            marginHorizontal: 20,
          }}>
          Top Services
        </Text>
        <LinearGradient
          colors={[
            themeColors.white,
            themeColors.white,
            themeColors.white,
            themeColors.primaryColor5,
            themeColors.primaryColor5,
            themeColors.white,
            themeColors.white,
            themeColors.white,
          ]}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            backgroundColor: themeColors.primaryColor7,
          }}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('EmergencyService')}>
            <Image
              source={require('../../assets/tow.png')}
              style={{width: '100%', height: '80%'}}
            />
            <Text style={styles.textBox}>Emergency</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('MaintenanceService')}>
            <Image
              source={require('../../assets/maintain.png')}
              style={{width: '100%', height: '80%'}}
            />
            <Text style={styles.textBox}>Maintaining</Text>
          </TouchableOpacity>
        </LinearGradient>
        <Card />
        {/* <View
          style={{
            backgroundColor: themeColors.white,
            flex: 1,
            padding: 10,
            alignSelf: 'center',
            backgroundColor: themeColors.primaryColor5,
            width: '90%',
            marginBottom: 20,
          }}>
          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '800'}}>
            About App
          </Text>
        </View> */}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: themeColors.primaryColor,
    width: '48%',
    height: 150,
    borderWidth: 1,
    borderColor: themeColors.primaryColor5,
    padding: 20,
    borderTopRightRadius: 30,
  },
  textBox: {
    textAlign: 'center',
    color: themeColors.white,
    fontSize: 20,
    fontWeight: '800',
  },
});