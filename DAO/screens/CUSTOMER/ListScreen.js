import {
  View,
  Text,
  Linking,
  TextInput,
  StyleSheet,
  ScrollView,
  Animated,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import GetLocation from 'react-native-get-location';
import {useDistanceMatrixMutation} from '../../services/Map';
// import {
//   useGetCompanyDetailMutation,
//   useGetCorCompanyQuery,
// } from '../services/Company';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../../common/theme';

// subscribe for more videos like this :)
export default function ListScreen() {
  const navigation = useNavigation();
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [distanceNum, setDistanceNum] = useState(10);
  const [markers, setMarkers] = React.useState([]);
  const [distanceMatrix] = useDistanceMatrixMutation();
  //   const getCorCompany = useGetCorCompanyQuery();
  //   const [getCompanyDetail] = useGetCompanyDetailMutation();
  const [region, setRegion] = useState({
    latitude: 10.5369728,
    longitude: 106.6734779,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [places, setPlaces] = useState([]);
  const companyCoordinates = [];
  useEffect(() => {
    requestPermission();
  }, []);
  useEffect(() => {
    console.log('distanceNum', distanceNum);
    setMarkers([]);
    // if (getCorCompany.isSuccess) {
    //   // console.log('data', getCorCompany.data.data);
    //   getCorCompany.data.data.map(val => {
    //     const obj = {id: val.accountId, latitude: val.lat, longitude: val.long};
    //     companyCoordinates.push(obj);
    //   });
    // } else {
    //   <View style={{flex: 1, justifyContent: 'center'}}>
    //     <ActivityIndicator size="large" color={themeColors.primaryColor} />
    //   </View>;
    // }
    getCurrentLocation();
  }, [distanceNum]);
  const requestPermission = async () => {
    if (Platform.OS == 'android') {
      getCurrentLocation();
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      // console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) getCurrentLocation();
      else {
        alert('notGranted');
      }
    }
  };
  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 10000,
    })
      .then(location => {
        setRegion({
          ...region,
          latitude: location.latitude,
          longitude: location.longitude,
        });
        apiCall(location.latitude, location.longitude);
      })
      .catch(error => {
        return error;
      });
    setLoading(false);
  };
  const apiCall = async (latitude, longitude) => {
    setPlaces([]);
    try {
      var string = '';
      let markerList = [];
      companyCoordinates.map(val => {
        if (string.length === 0) {
          string = val.latitude + ',' + val.longitude;
        } else {
          string = string + '%7C' + val.latitude + ',' + val.longitude;
        }
      });

      distanceMatrix({
        latitude: latitude,
        longitude: longitude,
        string: string,
      })
        .unwrap()
        .then(async payload => {
          // console.log('payload', payload.rows[0].elements);
          const withIndex = await payload.rows[0].elements.map((val, index) => {
            while (index <= companyCoordinates.length) {
              const id = companyCoordinates[index].id;
              return {id: id, ...val};
            }
          });
          const sortedList = withIndex.sort(
            (a, b) => a.distance.value - b.distance.value,
          );

          const showedMarker = [];
          sortedList.map(val => {
            if (val.distance.value <= distanceNum * 1000)
              showedMarker.push(val);
          });
          console.log('showedMarker', showedMarker);
          companyCoordinates.map(val => {
            showedMarker.map(value => {
              if (val.id === value.id) {
                const obj = {
                  ...val,
                  distance: value.distance,
                  duration: value.duration,
                };
                markerList.push(obj);
              }
            });
          });
          // console.log('markerList', markerList);
          const sortedMarker = markerList.sort(
            (a, b) => a.distance.value - b.distance.value,
          );
          // console.log('sortedMarker', sortedMarker);
          if (!sortedMarker.length) {
            setPlaces([]);
          } else {
            let newMarkers = await Promise.all(
              sortedMarker.map(async val => {
                let detail = {};
                await getCompanyDetail({id: val.id})
                  .unwrap()
                  .then(payload => (detail = payload))
                  .catch(error => {
                    return error;
                  });
                return {
                  id: detail.data._id,
                  coordinate: {
                    latitude: detail.companyDetail.lat,
                    longitude: detail.companyDetail.long,
                  },
                  title: detail.data.name,
                  address: detail.companyDetail.address || 'Not Available',
                  image: 'NA',
                  phoneNo: detail.data.phone,
                  email: detail.data.email,
                  distance: val.distance.text,
                  openTime: detail.companyDetail.openTime,
                  closeTime: detail.companyDetail.closeTime,
                };
              }),
            );
            setPlaces(newMarkers);
            console.log(places);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      setLoading(false);
    }
  };
  const openDialScreen = num => {
    if (Platform.OS === 'ios') {
      number = `telprompt:${num}`;
    } else {
      number = `tel:${num}`;
    }
    Linking.openURL(number);
  };
  return (
    <View style={styles.container}>
      <View style={styles.boxHeader}>
        <TouchableOpacity
          onPress={() => {
            setDistanceNum(10);
            setActive(0);
          }}
          style={[
            styles.distance,
            {
              backgroundColor:
                active === 0
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.text}>10 km</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDistanceNum(30);
            setActive(1);
          }}
          style={[
            styles.distance,
            {
              backgroundColor:
                active === 1
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.text}>30 km</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDistanceNum(50);
            setActive(2);
          }}
          style={[
            styles.distance,
            {
              backgroundColor:
                active === 2
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.text}>50 km</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: themeColors.primaryColor2,
          fontStyle: 'italic',
          marginHorizontal: 20,
          fontSize: 16,
          fontWeight: '700',
          paddingBottom: 5,
        }}>
        Nearby places in {distanceNum}km
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('GarageDetail')}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: themeColors.gray,
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 13,
              color: themeColors.white,
              fontWeight: '700',
              position: 'absolute',
              top: 10,
              right: 0,
              backgroundColor: themeColors.primaryColor,
              padding: 3,
              width: 100,
              textAlign: 'center',
            }}>
            9km
          </Text>
          <Text
            style={{
              fontWeight: '900',
              fontSize: 18,
              color: themeColors.primaryColor,
              width: '70%',
              marginTop: 10,
            }}>
            ABC Garage
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: themeColors.primaryColor7,
              fontStyle: 'italic',
            }}>
            ABC Street
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: themeColors.primaryColor6,
              fontStyle: 'italic',
            }}>
            Hour Working: 6AM - 10PM
          </Text>
          <View style={{alignSelf: 'flex-end'}}>
            <Text
              style={{
                fontSize: 15,
                color: themeColors.primaryColor7,
                fontWeight: '700',
              }}>
              Email: 123@gmail.com
            </Text>
            <TouchableOpacity
              onPress={() => openDialScreen(item?.phoneNo)}
              style={{
                marginTop: 2,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: themeColors.primaryColor7,
                  fontWeight: '700',
                }}>
                Phone: 0832011697
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {/* <FlatList
        style={{marginBottom: 150}}
        ItemSeparatorComponent={
          Platform.OS !== 'android' &&
          (({highlighted}) => (
            <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
          ))
        }
        data={places.length === 0 ? [] : places}
        renderItem={({item, index, separators}) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('GarageDetail', {id: item.id})}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderWidth: 1,
                marginHorizontal: 20,
                borderColor: themeColors.gray,
                marginVertical: 10,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color: themeColors.white,
                  fontWeight: '600',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: themeColors.blue,
                  padding: 3,
                  borderTopRightRadius: 20,
                  borderBottomLeftRadius: 20,
                  width: 100,
                  textAlign: 'center',
                }}>
                {item.distance}
              </Text>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 18,
                  color: themeColors.blue,
                  width: '70%',
                  marginTop: 10,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: themeColors.gray60,
                  fontStyle: 'italic',
                }}>
                {item.address}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: themeColors.blue,
                  fontStyle: 'italic',
                }}>
                Hour Working: {item.openTime} - {item.closeTime}
              </Text>
              <View style={{alignSelf: 'flex-end'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: themeColors.primaryColor,
                    fontWeight: '700',
                  }}>
                  Email: {item.email}
                </Text>
                <TouchableOpacity
                  onPress={() => openDialScreen(item?.phoneNo)}
                  style={{
                    marginTop: 2,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: themeColors.primaryColor,
                      fontWeight: '700',
                    }}>
                    Phone: {item.phoneNo}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: themeColors.white,
  },
  item: {
    backgroundColor: themeColors.white,
  },
  boxHeader: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  distance: {
    borderWidth: 1,
    margin: 10,
    width: 70,
    padding: 8,
    borderRadius: 10,
    borderColor: themeColors.primaryColor5,
  },
  text: {
    color: themeColors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
