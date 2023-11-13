import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {themeColors} from '../../common/theme';
import Header2 from '../../common/Header2';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {Formik} from 'formik';
import * as yup from 'yup';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const personalInfor = yup.object().shape({
  name: yup.string().required('Required'),
  address: yup.string().required('Required'),
  date: yup.string().required('Required'),
  time: yup.string().required('Required'),
  phone: yup
    .string()
    .required('Required')
    .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Must be a valid phone'),
});
export default function BookingService() {
  const [selectedDate, setDate] = useState('');
  const minDate = new Date();
  const time = ['7:00', '10:00', '13:00', '15:00'];
  const serviceType = ['service 1', 'service 2', 'service 3', 'service 4'];
  const [visible, setVisible] = useState(false);
  const [nextStep, setNext] = useState(true);
  const [chosenTime, setTime] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const onDateChange = date => {
    setDate(new Date(date).toLocaleDateString('en-GB'));
    hideModal();
  };
  const AppointmentFill = values => {
    console.log(values);
  };
  return (
    <View style={{flex: 1, backgroundColor: themeColors.white}}>
      <Header2 name="Booking Service" />
      <View style={{flex: 1}}>
        <Formik
          validationSchema={personalInfor}
          onSubmit={values => AppointmentFill(values)}
          validateOnMount={true}
          initialValues={{
            name: '',
            address: '',
            phone: '',
            date: selectedDate,
            time: chosenTime,
          }}>
          {({errors, handleChange, handleSubmit, touched, isValid}) => {
            console.log(selectedDate);
            return (
              <ProgressSteps>
                <ProgressStep nextBtnDisabled={!isValid}>
                  <View
                    style={{
                      paddingHorizontal: 30,
                    }}>
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
                            onPress={() => {
                              setTime(val);
                            }}
                            style={{
                              borderWidth: 1,
                              borderColor: themeColors.primaryColor8,
                              borderRadius: 10,
                              padding: 10,
                              marginVertical: 15,
                              width: 80,
                            }}>
                            <Text
                              style={{
                                color: themeColors.primaryColor8,
                                fontWeight: '700',
                                fontSize: 16,
                                textAlign: 'center',
                              }}>
                              {val}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </ProgressStep>
                <ProgressStep>
                  <View style={{alignItems: 'center'}}>
                    <Text>This is the content within step 2!</Text>
                  </View>
                </ProgressStep>
                <ProgressStep>
                  <View style={{alignItems: 'center'}}>
                    <Text>This is the content within step 3!</Text>
                  </View>
                </ProgressStep>
              </ProgressSteps>
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
    </View>
  );
}
const styles = StyleSheet.create({
  form: {},
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
  title2: {
    fontSize: 16,
    color: themeColors.primaryColor2,
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
