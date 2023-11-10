import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {themeColors} from '../../common/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as yup from 'yup';
import CalendarPicker from 'react-native-calendar-picker';
import {Button, Divider} from 'react-native-paper';
const signUpValidationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  address: yup.string().required('Required'),
  info: yup.string().required('Required'),
  date: yup.string().required('Required'),
  time: yup.string().required('Required'),
  phone: yup
    .string()
    .required('Required')
    .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Must be a valid phone'),
});
export default function Booking() {
  const [selectedDate, setDate] = useState('');
  const minDate = new Date();
  const time = ['7:00', '10:00', '13:00', '15:00'];
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const onDateChange = date => {
    setDate(new Date(date).toLocaleDateString('en-GB'));
    hideModal();
  };
  return (
    <ScrollView style={{backgroundColor: themeColors.white, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: themeColors.white,
          borderBottomWidth: 3,
          borderBlockColor: '#e8e8e8',
        }}>
        <TouchableOpacity>
          <Icon name="angle-left" size={35} color={themeColors.primaryColor} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '800',
            color: themeColors.primaryColor,
            marginLeft: 20,
          }}>
          Booking Service
        </Text>
      </View>
      <View>
        <Formik
          validationSchema={signUpValidationSchema}
          onSubmit={values => Register(values)}
          initialValues={{
            name: '',
            address: '',
            phone: '',
            info: '',
            date: '',
            time: '',
          }}>
          {({errors, handleChange, handleSubmit, touched}) => {
            return (
              <View style={styles.form}>
                <Text
                  style={{
                    fontSize: 20,
                    color: themeColors.primaryColor7,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginBottom: 15,
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
                      color: themeColors.primaryColor7,
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
                      backgroundColor: themeColors.primaryColor,
                      padding: 10,
                      width: '20%',
                      height: 50,
                      alignItems: 'center',
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                    }}>
                    <Icon name="calendar" color={themeColors.white} size={26} />
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
                      <Button
                        mode="outlined"
                        style={{
                          borderRadius: 10,
                          borderColor: '#e8e8e8',
                          borderWidth: 2,
                          width: 100,
                          marginVertical: 5,
                        }}
                        key={val}
                        textColor={themeColors.primaryColor8}
                        labelStyle={{fontSize: 14, fontWeight: '700'}}
                        onPress={() => console.log('Pressed')}>
                        {val}
                      </Button>
                    );
                  })}
                </View>
                <Divider
                  style={{
                    marginVertical: 15,
                    borderColor: themeColors.primaryColor8,
                    borderWidth: 2,
                  }}
                />
                {/* Car Information */}
                <Text
                  style={{
                    fontSize: 20,
                    color: themeColors.primaryColor7,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginBottom: 15,
                    fontStyle: 'italic',
                  }}>
                  Vehicle Information
                </Text>
                <View style={styles.titleText}>
                  <Text style={styles.title}>Automaker</Text>
                  {errors.info && touched.info && (
                    <Text style={styles.errorText}> {errors.info} </Text>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  onChangeText={handleChange('info')}
                />
                <View style={styles.titleText}>
                  <Text style={styles.title}>Type Of Service</Text>
                  {errors.info && touched.info && (
                    <Text style={styles.errorText}> {errors.info} </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: themeColors.primaryColor,
                    padding: 10,
                    width: '90%',
                    borderRadius: 10,
                    marginTop: 30,
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
  form: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
    color: themeColors.primaryColor7,
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