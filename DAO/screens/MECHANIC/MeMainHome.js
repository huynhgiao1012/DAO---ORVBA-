import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../../common/theme';
import {useGetUserDetailMutation} from '../../services/User';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import {useReverseGeoMutation} from '../../services/Map';
import GetLocation from 'react-native-get-location';

export default function MeMainHome() {
  const [getUserDetail] = useGetUserDetailMutation();
  const [reverseGeo] = useReverseGeoMutation();
  const [address, setAddress] = useState('');
  const [data, setData] = useState({
    _id: '',
    email: '',
    isActive: false,
    name: '',
    phone: '',
    role: '',
    img: '',
  });
  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 10000,
    })
      .then(location => {
        reverseGeo({latitude: location.latitude, longitude: location.longitude})
          .then(payload => {
            setAddress(payload.data.results[0].formatted_address);
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        return error;
      });
  };
  useEffect(() => {
    getCurrentLocation();
    getUserDetail()
      .unwrap()
      .then(payload => {
        setData(data => ({
          ...data,
          ...payload.data,
        }));
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: themeColors.white}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 50,
          paddingHorizontal: 20,
          backgroundColor: themeColors.primaryColor,
          height: 170,
        }}>
        <View style={{}}>
          <Text
            style={{
              alignSelf: 'flex-start',
              color: themeColors.white,
              fontSize: 32,
              fontWeight: 'bold',
            }}>
            Welcome home
          </Text>
          <Text
            style={{
              alignSelf: 'flex-start',
              color: themeColors.white,
              fontSize: 18,
              fontWeight: '600',
            }}>
            {data.name}
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Image
            source={require('../../assets/mechanic.png')}
            style={{width: 150, height: 150}}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: themeColors.white,
          position: 'absolute',
          top: 110,
          width: '100%',
          padding: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="map-marker" size={25} color="red" />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: themeColors.primaryColor7,
              paddingLeft: 10,
              fontStyle: 'italic',
            }}>
            {address}
          </Text>
        </View>
      </View>
    </View>
    // <View>
    //   <View
    //     style={{
    //       backgroundColor: themeColors.white,
    //       flex: 1,
    //       position: 'absolute',
    //       top: 120,
    //       width: '100%',
    //     }}>
    //     <Text
    //       style={{
    //         alignSelf: 'flex-start',
    //         color: themeColors.white,
    //         fontSize: 20,
    //         fontWeight: '700',
    //         fontStyle: 'italic',
    //       }}>
    //       hihi
    //     </Text>
    //   </View>
    // </View>
  );
}
