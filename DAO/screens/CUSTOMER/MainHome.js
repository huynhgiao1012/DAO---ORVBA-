import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../../common/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import GetLocation from 'react-native-get-location';

export default function MainHome() {
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
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <View
        style={{
          backgroundColor: themeColors.primaryColor,
          borderBottomLeftRadius: 50,
          padding: 20,
          flexDirection: 'row',
          alignContent: 'space-between',
          alignItems: 'center',
        }}>
        <Icon
          name="person-circle-outline"
          size={70}
          color={themeColors.white}
        />
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: themeColors.white,
            paddingLeft: 10,
            width: 300,
          }}>
          WELCOME HOME, JONH !
        </Text>
      </View>
      <View style={{margin: 20}}>
        <Text
          style={{
            color: themeColors.primaryColor4,
            fontWeight: '600',
            fontSize: 20,
            fontStyle: 'italic',
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
              color: themeColors.primaryColor7,
              paddingLeft: 10,
            }}>
            Dong Thanh Can Giuoc Long An
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: themeColors.primaryColor4,
          fontWeight: '600',
          fontSize: 20,
          fontStyle: 'italic',
          paddingBottom: 10,
          marginHorizontal: 20,
        }}>
        Our Service
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          backgroundColor: themeColors.primaryColor5,
          marginVertical: 20,
        }}>
        <TouchableOpacity style={styles.box}>
          <Image
            source={require('../../assets/tow.png')}
            style={{width: '100%', height: '80%'}}
          />
          <Text
            style={{
              textAlign: 'center',
              color: themeColors.primaryColor,
              fontSize: 20,
              fontWeight: 600,
            }}>
            Emergency
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Image
            source={require('../../assets/maintain.png')}
            style={{width: '100%', height: '80%'}}
          />
          <Text
            style={{
              textAlign: 'center',
              color: themeColors.primaryColor,
              fontSize: 20,
              fontWeight: 600,
            }}>
            Maintaining
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: themeColors.white,
    width: '45%',
    height: 150,
    borderWidth: 2,
    borderColor: themeColors.primaryColor6,
    padding: 20,
    borderRadius: 20,
  },
});
