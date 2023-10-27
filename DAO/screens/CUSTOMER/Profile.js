import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {themeColors} from '../../common/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Profile() {
  return (
    <View style={{flex: 1, backgroundColor: themeColors.white}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Icon name="angle-left" size={30} color={themeColors.primaryColor} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '800',
            color: themeColors.primaryColor,
          }}>
          Profile
        </Text>
        <Icon name="ellipsis-v" size={25} color={themeColors.primaryColor} />
      </View>
      <ImageBackground
        source={require('../../assets/bg.png')}
        resizeMode="stretch"
        style={{flex: 1}}>
        <View
          style={{
            marginHorizontal: 10,
            width: '95%',
            borderRadius: 30,
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderBottomColor: themeColors.primaryColor5,
          }}>
          <Image
            source={require('../../assets/baoduong.jpg')}
            style={{
              width: 130,
              height: 130,
              borderRadius: 100,
              alignSelf: 'center',
              borderWidth: 3,
              borderColor: themeColors.primaryColor,
            }}
          />
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: themeColors.primaryColor7,
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            JONH SMITH
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="envelope" color={themeColors.primaryColor} size={20} />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: themeColors.primaryColor6,
              }}>
              huynhgiaolethi0@gmail.com
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="phone-square"
              color={themeColors.primaryColor}
              size={20}
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: themeColors.primaryColor6,
              }}>
              0832011697
            </Text>
          </View>
        </View>
        <View style={styles.btn_group}>
          <TouchableOpacity style={styles.btn}>
            <Icon name="exchange" color={themeColors.primaryColor6} />
            <Text style={styles.btn_text}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Icon name="exchange" />
            <Text style={styles.btn_text}>Update</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    padding: 15,
    backgroundColor: themeColors.primaryColor5,
    borderRadius: 10,
    width: 160,
  },
  btn_group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  btn_text: {
    textAlign: 'center',
  },
});
