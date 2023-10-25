import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
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
    <ScrollView style={{backgroundColor: themeColors.white, flex: 1}}>
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
      <View style={{width: '100%', height: 200, alignSelf: 'center'}}>
        <Image
          source={require('../../assets/towing.gif')}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View style={{margin: 20}}>
        <Text
          style={{
            color: themeColors.primaryColor2,
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
        <TouchableOpacity style={styles.box}>
          <Image
            source={require('../../assets/tow.png')}
            style={{width: '100%', height: '80%'}}
          />
          <Text style={styles.textBox}>Emergency</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Image
            source={require('../../assets/maintain.png')}
            style={{width: '100%', height: '80%'}}
          />
          <Text style={styles.textBox}>Maintaining</Text>
        </TouchableOpacity>
      </LinearGradient>
      <View
        style={{
          backgroundColor: themeColors.white,
          flex: 1,
          padding: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: themeColors.white,
            paddingHorizontal: 20,
            width: '100%',
            borderWidth: 1,
            borderColor: themeColors.primaryColor5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: themeColors.primaryColor7,
              fontStyle: 'italic',
            }}>
            Discover near garage now !!!
          </Text>
          <View
            style={{
              width: 70,
              height: 70,
            }}>
            <Image
              source={require('../../assets/booking.gif')}
              style={{width: '100%', height: '100%'}}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: themeColors.white,
            width: '100%',
            borderWidth: 1,
            borderColor: themeColors.primaryColor5,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 100,
              height: 100,
              marginRight: 15,
            }}>
            <Image
              source={require('../../assets/baoduong.jpg')}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: themeColors.primaryColor7,
              width: '70%',
            }}>
            Reading More - Maintenance Process
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: themeColors.white,
    width: '48%',
    height: 150,
    borderWidth: 1,
    borderColor: themeColors.primaryColor5,
    padding: 20,
    borderTopLeftRadius: 30,
  },
  textBox: {
    textAlign: 'center',
    color: themeColors.primaryColor7,
    fontSize: 20,
    fontWeight: '800',
  },
});
