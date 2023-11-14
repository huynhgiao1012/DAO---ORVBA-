import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {themeColors} from '../common/theme';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required('Required'),
  password: yup
    .string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`<>])(?=.{8,})/,
      'Must Contain 8 Characters, Uppercase, Lowercase, Number and Special Case Character',
    ),
});
export default function LoginScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const Login = data => {
    navigation.navigate('Home');
  };

  return (
    <LinearGradient
      style={{flex: 1}}
      colors={[
        themeColors.white,
        themeColors.white,
        themeColors.white,
        themeColors.white,
        themeColors.white,
        themeColors.white,
        themeColors.white,
        themeColors.primaryColor,
      ]}>
      <View style={{marginVertical: 80}}>
        {/* {isLoading && (
            <Modal isVisible={true} transparent={true}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: '90%',
                  alignSelf: 'center',
                }}>
                <ActivityIndicator size={40} color={themeColors.white} />
              </View>
            </Modal>
          )} */}
        <Text
          style={{
            marginVertical: 20,
            fontSize: 36,
            fontWeight: '800',
            textAlign: 'center',
            color: themeColors.primaryColor,
          }}>
          LOGIN
        </Text>
        <View
          style={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            marginHorizontal: 30,
          }}>
          <Formik
            validationSchema={loginValidationSchema}
            onSubmit={values => Login(values)}
            initialValues={{email: '', password: ''}}>
            {({errors, handleChange, handleBlur, handleSubmit, touched}) => {
              return (
                <View>
                  <View style={styles.title}>
                    <Text style={styles.text}>Email</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={themeColors.white}
                    onChangeText={handleChange('email')}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <View style={styles.title}>
                    <Text style={styles.text}>Password</Text>
                  </View>
                  <TextInput
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor={themeColors.white}
                    onChangeText={handleChange('password')}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <TouchableOpacity
                    className="flex items-end"
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text
                      style={{
                        alignSelf: 'flex-end',
                        padding: 10,
                        color: themeColors.primaryColor2,
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      alignSelf: 'center',
                      backgroundColor: themeColors.primaryColor,
                      padding: 10,
                      width: '50%',
                      borderRadius: 10,
                      marginTop: 15,
                    }}>
                    <Text
                      style={{
                        color: themeColors.white,
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      LOGIN
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>

          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              flexDirection: 'row',
              marginVertical: 8,
            }}>
            <Text
              style={{
                color: themeColors.primaryColor8,
                paddingRight: 8,
                fontStyle: 'italic',
              }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: themeColors.primaryColor2,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  input: {
    borderColor: themeColors.primaryColor6,
    borderWidth: 2,
    fontSize: 18,
    color: themeColors.primaryColor2,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    paddingLeft: 10,
    paddingTop: 10,
    fontStyle: 'italic',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    width: '70%',
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    color: themeColors.primaryColor2,
    fontWeight: '700',
    marginVertical: 10,
  },
});
