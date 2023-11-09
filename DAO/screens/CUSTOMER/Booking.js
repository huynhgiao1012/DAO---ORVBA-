import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {themeColors} from '../../common/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as yup from 'yup';
import CalendarPicker from 'react-native-calendar-picker';
const signUpValidationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  address: yup.string().required('Required'),
  info: yup.string().required('Required'),
  phone: yup
    .string()
    .required('Required')
    .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Must be a valid phone'),
});
export default function Booking() {
  const [date, setDate] = useState('');
  const onDateChange = date => {
    setDate(date);
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
          initialValues={{name: '', address: '', phone: '', info: ''}}>
          {({errors, handleChange, handleSubmit, touched}) => {
            return (
              <View style={styles.form}>
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
                  <Text style={styles.title}>Vehicle Information</Text>
                  {errors.info && touched.info && (
                    <Text style={styles.errorText}> {errors.info} </Text>
                  )}
                </View>

                <TextInput
                  style={styles.input}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                />
                <CalendarPicker onDateChange={onDateChange} width={300} />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: themeColors.primaryColor,
                    padding: 10,
                    width: '90%',
                    borderRadius: 20,
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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  form: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  title: {
    fontSize: 17,
    color: themeColors.primaryColor2,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: themeColors.primaryColor5,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: themeColors.primaryColor7,
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
});
