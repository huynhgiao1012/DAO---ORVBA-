import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Rating} from 'react-native-ratings';
import Header2 from '../../common/Header2';
import {themeColors} from '../../common/theme';
import {useGetGarageDetailMutation} from '../../services/Garage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import {List} from 'react-native-paper';
import {useGetAllFbMutation} from '../../services/Feedback';
import {useGetCompanyServiceMutation} from '../../services/Service';

export default function GarageDetail({route}) {
  const {id, distance} = route.params;
  const [totalRatings, setTotalRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [getAllFb] = useGetAllFbMutation();
  const [feedback, setFb] = useState([]);
  const [service, setService] = useState([]);
  const [getDetail, {isLoading}] = useGetGarageDetailMutation();
  const [getCompanyService] = useGetCompanyServiceMutation();
  const arr = [1, 2, 3, 4, 5];
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [data, setData] = useState({
    _id: '',
    address: '',
    closeTime: '',
    description: '',
    email: '',
    name: '',
    openTime: '',
    phone: '',
    img: '',
  });
  useEffect(() => {
    setFb([]);
    setService([]);
    getDetail({id})
      .unwrap()
      .then(payload => {
        setData(data => ({
          ...data,
          ...payload.data,
        }));
      })
      .catch(error => {
        return error;
      });
    getAllFb({id})
      .unwrap()
      .then(payload => {
        setFb(data => [...data, ...payload.data]);
      })
      .catch(error => {
        return error;
      });
    getCompanyService({id})
      .unwrap()
      .then(payload => {
        setService(data => [...data, ...payload.data]);
      })
      .catch(error => {
        return error;
      });
  }, []);
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <Header2 name="Garage Detail" />
      {isLoading && (
        <Modal isVisible={true} transparent={true}>
          <View
            style={{
              backgroundColor: '#f8f8f8aa',
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
      <ScrollView>
        {/* <View>
          <Image
            source={{
              uri:
                data.img.length > 0
                  ? data.img[0]
                  : 'https://static.vecteezy.com/system/resources/thumbnails/011/299/215/small/simple-loading-or-buffering-icon-design-png.png',
            }}
            indicator={() => (
              <ActivityIndicator size={40} color={themeColors.primaryColor} />
            )}
            style={{
              width: '100%',
              height: 200,
            }}
          />
        </View> */}
        <View
          style={{
            marginHorizontal: 20,
          }}>
          <View
            style={{
              paddingVertical: 10,
            }}>
            <Text
              style={{
                color: themeColors.primaryColor,
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {data.name}
            </Text>
            <View style={styles.rating}>
              <Rating
                ratingCount={rating}
                type="star"
                readonly={true}
                startingValue={rating || 0}
                imageSize={14}
              />
              <Text style={styles.ratingTxt}>
                {rating || 0} ({totalRatings || 0} Ratings)
              </Text>
            </View>
          </View>
          {/* email && phone */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Icon
                name="envelope"
                color={themeColors.primaryColor7}
                size={16}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: themeColors.primaryColor7,
                  fontWeight: '600',
                  marginLeft: 8,
                  fontStyle: 'italic',
                }}>
                {data.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Icon name="phone" color={themeColors.primaryColor7} size={20} />
              <Text
                style={{
                  fontSize: 15,
                  color: themeColors.primaryColor7,
                  fontWeight: '600',
                  marginLeft: 8,
                  fontStyle: 'italic',
                }}>
                {data.phone}
              </Text>
            </View>
          </View>
          {/* address */}
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                borderLeftWidth: 5,
                borderLeftColor: themeColors.primaryColor2,
              }}>
              <View style={{marginHorizontal: 12}}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 15,
                    color: themeColors.black,
                  }}>
                  {data.address}
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    color: themeColors.primaryColor4,
                    fontStyle: 'italic',
                    marginTop: 5,
                  }}>
                  About {distance} from you
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '20%',
                paddingHorizontal: 25,
                paddingVertical: 17,
                borderLeftColor: themeColors.primaryColor5,
                borderLeftWidth: 3,
                borderStyle: 'dotted',
              }}>
              <Icon
                name="map-marker"
                color={themeColors.primaryColor}
                size={30}
              />
            </View>
          </View>
          {/* open time */}
          <View
            style={{
              borderLeftWidth: 5,
              borderLeftColor: themeColors.primaryColor2,
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderRightColor: themeColors.primaryColor5,
                borderRightWidth: 2,
              }}>
              <Icon2 name="store" color={themeColors.black} size={16} />
              <Text
                style={{
                  fontSize: 15,
                  color: themeColors.black,
                  fontWeight: '700',
                  marginHorizontal: 8,
                }}>
                Open
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                color: themeColors.black,
                fontWeight: '700',
                marginHorizontal: 8,
              }}>
              {data.openTime} - {data.closeTime}
            </Text>
          </View>
          {/* description */}
          <View
            style={{
              borderLeftWidth: 5,
              borderLeftColor: themeColors.primaryColor2,
              paddingHorizontal: 10,
              marginBottom: 20,
            }}>
            <List.Section>
              <List.Accordion
                title="Description"
                titleStyle={{
                  color: themeColors.black,
                  fontWeight: 'bold',
                }}
                style={{backgroundColor: '#e8e8e8'}}>
                <List.Item
                  title={data.description}
                  titleNumberOfLines={200}
                  titleStyle={{textAlign: 'justify'}}
                />
              </List.Accordion>
            </List.Section>
          </View>
          {/* services */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Icon name="cog" color={themeColors.primaryColor4} size={30} />
            <Text
              style={{
                fontSize: 20,
                color: themeColors.primaryColor4,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              Services
            </Text>
          </View>
          {service.length > 0 &&
            service.map((val, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginVertical: 10,
                    backgroundColor: themeColors.primaryColor5,
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: themeColors.primaryColor7,
                      fontWeight: '700',
                      fontSize: 16,
                    }}>
                    {val.serviceName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          {/* feedback */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Icon name="comments" color={themeColors.primaryColor4} size={26} />
            <Text
              style={{
                fontSize: 20,
                color: themeColors.primaryColor4,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              Feedback
            </Text>
          </View>
          {feedback.length > 0 ? (
            feedback.map((val, index) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 10,
                    backgroundColor: '#f8f8f8',
                    paddingVertical: 15,
                    marginTop: 10,
                    borderRadius: 5,
                    marginBottom: 20,
                  }}
                  key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: themeColors.primaryColor7,
                        fontStyle: 'italic',
                        fontWeight: '700',
                      }}>
                      {val.customerId.name}
                    </Text>
                    <Rating
                      tintColor="#f8f8f8"
                      ratingCount={val.rating}
                      type="star"
                      readonly={true}
                      startingValue={val.rating || 0}
                      imageSize={16}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: themeColors.black,
                      width: '100%',
                      textAlign: 'justify',
                    }}>
                    {val.review}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: themeColors.black,
                      width: '100%',
                      textAlign: 'right',
                      fontStyle: 'italic',
                    }}>
                    {new Date(val.createdAt).toLocaleString('en-GB')}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text>No Feedbacks</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  ratingTxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginLeft: 5,
    color: themeColors.primaryColor8,
  },
});
