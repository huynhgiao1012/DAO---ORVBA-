import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useReverseGeoMutation} from '../../services/Map';
import {themeColors} from '../../common/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as yup from 'yup';
import CalendarPicker from 'react-native-calendar-picker';
import SelectDropdown from 'react-native-select-dropdown';
import Header2 from '../../common/Header2';
import GetLocation from 'react-native-get-location';
import {useGetCustomerDetailMutation} from '../../services/Customer';
import {useGetCompanyServiceMutation} from '../../services/Service';

const personalInfor = yup.object().shape({
  name: yup.string().required('Required'),
  address: yup.string().required('Required'),
  date: yup.string(),
  time: yup.string(),
  phone: yup
    .string()
    .required('Required')
    .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Must be a valid phone'),
  automaker: yup.string().required('Required'),
  service: yup.array().required('Required'),
  note: yup.array().required('Required'),
});
export default function Booking({route}) {
  const [selectedDate, setDate] = useState('');
  const [reverseGeo] = useReverseGeoMutation();
  const minDate = new Date();
  const [address, setAddress] = useState('');
  const [getUserDetail, {isLoading}] = useGetCustomerDetailMutation();
  const time = ['7:00', '10:00', '13:00', '15:00'];
  const serviceType = ['service 1', 'service 2', 'service 3', 'service 4'];
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [getCompanyService] = useGetCompanyServiceMutation();
  const [data, setData] = useState({
    _id: '',
    email: '',
    name: '',
    phone: '',
  });
  const [service, setService] = useState([]);
  const {id} = route.params;
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
    setService([]);
    getUserDetail()
      .unwrap()
      .then(payload =>
        setData(data => ({
          ...data,
          ...payload.data,
        })),
      )
      .catch(error => console.log(error));
    getCompanyService({id})
      .unwrap()
      .then(payload => {
        const arr = [];
        payload.data.map(val => {
          arr.push(val.serviceName);
        });
        setService(prev => [...prev, ...arr]);
      })
      .catch(error => {
        return error;
      });
  }, []);
  const onDateChange = date => {
    setDate(new Date(date).toLocaleDateString('en-GB'));
    hideModal();
  };
  const AppointmentFill = values => {
    console.log(values);
  };
  return (
    <ScrollView style={{backgroundColor: themeColors.white, flex: 1}}>
      <Header2 name="Booking Service" />
      <View style={{marginTop: 15}}>
        <Formik
          validationSchema={personalInfor}
          onSubmit={values => AppointmentFill(values)}
          validateOnMount={true}
          initialValues={{
            name: '',
            address: '',
            phone: '',
            date: '',
            time: '',
            automaker: '',
            service: '',
            note: '',
          }}>
          {({errors, handleChange, handleSubmit, touched, isValid}) => {
            return (
              <View style={styles.form}>
                <View style={{marginVertical: 10, paddingHorizontal: 20}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: themeColors.white,
                      textAlign: 'right',
                      fontWeight: 'bold',
                      marginBottom: 15,
                      alignSelf: 'flex-end',
                      backgroundColor: themeColors.primaryColor7,
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      fontStyle: 'italic',
                    }}>
                    Appointment Information
                  </Text>
                  <View style={styles.titleText}>
                    <Text style={styles.title}>Full Name</Text>
                    {errors.name && touched.name && (
                      <Text style={styles.errorText}> {errors.name} </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    defaultValue={data.name}
                  />
                  <View style={styles.titleText}>
                    <Text style={styles.title}>Address</Text>
                    {errors.address && touched.address && (
                      <Text style={styles.errorText}> {errors.address} </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('address')}
                    defaultValue={address}
                    multiline={true}
                  />
                  <View style={styles.titleText}>
                    <Text style={styles.title}>Phone Number</Text>
                    {errors.phone && touched.phone && (
                      <Text style={styles.errorText}> {errors.phone} </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('phone')}
                    defaultValue={data.phone}
                  />
                  <View style={styles.titleText}>
                    <Text style={styles.title}>Date</Text>
                    {errors.date && touched.date && (
                      <Text style={styles.errorText}> {errors.date} </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <TextInput
                      style={{
                        width: '80%',
                        borderWidth: 1,
                        borderColor: themeColors.primaryColor5,
                        marginVertical: 5,
                        paddingHorizontal: 10,
                        color: themeColors.primaryColor8,
                        fontWeight: '700',
                        fontSize: 16,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                      }}
                      onChangeText={handleChange('date')}
                      value={selectedDate}
                      readOnly={true}
                    />
                    <TouchableOpacity
                      onPress={showModal}
                      style={{
                        backgroundColor: themeColors.primaryColor7,
                        padding: 10,
                        width: '20%',
                        height: 50,
                        alignItems: 'center',
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                      }}>
                      <Icon
                        name="calendar"
                        color={themeColors.white}
                        size={26}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.titleText}>
                    <Text style={styles.title}>Available Time</Text>
                    {errors.time && touched.time && (
                      <Text style={styles.errorText}> {errors.time} </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      flexWrap: 'wrap',
                    }}>
                    {time.map(val => {
                      return (
                        <TouchableOpacity
                          key={val}
                          style={{
                            borderWidth: 1,
                            borderColor: themeColors.primaryColor7,
                            borderRadius: 10,
                            padding: 10,
                            marginVertical: 15,
                            width: 70,
                          }}>
                          <Text
                            style={{
                              color: themeColors.primaryColor7,
                              fontWeight: '700',
                              fontSize: 15,
                              textAlign: 'center',
                            }}>
                            {val}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <View
                  style={{
                    borderTopLeftRadius: 50,
                    paddingHorizontal: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: themeColors.white,
                      textAlign: 'left',
                      fontWeight: 'bold',
                      marginBottom: 15,
                      backgroundColor: themeColors.primaryColor,
                      alignSelf: 'flex-start',
                      paddingVertical: 3,
                      paddingHorizontal: 8,
                    }}>
                    Vehicle Information
                  </Text>
                  <View style={styles.titleText}>
                    <Text style={styles.title2}>Automaker</Text>
                    {errors.automaker && touched.automaker && (
                      <Text style={styles.errorText}> {errors.automaker} </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.input2}
                    onChangeText={handleChange('automaker')}
                  />
                  <View style={styles.titleText}>
                    <Text style={styles.title2}>Service</Text>
                    {errors.automaker && touched.automaker && (
                      <Text style={styles.errorText}> {errors.automaker} </Text>
                    )}
                  </View>
                  <SelectDropdown
                    buttonStyle={{
                      width: '100%',
                      marginVertical: 10,
                      borderRadius: 10,
                      borderColor: themeColors.primaryColor5,
                      borderWidth: 1,
                      backgroundColor: themeColors.white,
                    }}
                    rowStyle={{backgroundColor: '#f8f8f8'}}
                    rowTextStyle={{
                      color: themeColors.primaryColor4,
                      fontWeight: '600',
                    }}
                    buttonTextStyle={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: themeColors.primaryColor,
                    }}
                    data={service}
                    onSelect={(selectedItem, index) => {
                      handleChange('service');
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                  <View style={styles.titleText}>
                    <Text style={styles.title2}>Note</Text>
                    {errors.note && touched.note && (
                      <Text style={styles.errorText}> {errors.note} </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.input2}
                    onChangeText={handleChange('note')}
                    numberOfLines={4}
                    maxLength={50}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: themeColors.primaryColor,
                    padding: 10,
                    width: '90%',
                    borderRadius: 10,
                    marginVertical: 30,
                  }}>
                  <Text
                    style={{
                      color: themeColors.white,
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Book Appointment
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={visible}>
        <View
          style={{
            backgroundColor: '#000000aa',
            flex: 1,
          }}>
          <View style={styles.modalView}>
            <CalendarPicker
              startFromMonday={true}
              onDateChange={onDateChange}
              minDate={minDate}
              todayBackgroundColor={themeColors.primaryColor}
              selectedDayTextColor={themeColors.white}
              textStyle={{
                color: themeColors.primaryColor7,
                fontWeight: '600',
              }}
              width={380}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  form: {},
  title: {
    fontSize: 16,
    color: themeColors.black,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: themeColors.primaryColor5,
    marginVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: themeColors.primaryColor8,
    fontWeight: '700',
    fontSize: 16,
  },
  title2: {
    fontSize: 16,
    color: themeColors.primaryColor,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  input2: {
    borderWidth: 1,
    borderColor: themeColors.primaryColor5,
    marginVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: themeColors.primaryColor7,
    fontWeight: '700',
    fontSize: 16,
    backgroundColor: themeColors.white,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    paddingLeft: 10,
    fontStyle: 'italic',
  },
  titleText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    width: '70%',
  },
  modalView: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    top: 200,
    left: 0,
  },
});
