import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';
import ForgotPass from '../screens/ForgotPass';
import Home from '../screens/CUSTOMER/Home';
import EmergencyService from '../screens/CUSTOMER/EmergencyService';
import MaintenanceService from '../screens/CUSTOMER/MaintenanceService';
import MapScreen from '../screens/CUSTOMER/MapScreen';
import ListScreen from '../screens/CUSTOMER/ListScreen';
import GarageDetail from '../screens/CUSTOMER/GarageDetail';
import Booking from '../screens/CUSTOMER/Booking';

const Stack = createStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          options={{headerShown: false}}
          component={Welcome}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUp}
        />
        <Stack.Screen
          name="ForgotPassword"
          options={{headerShown: false}}
          component={ForgotPass}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="MaintenanceService"
          options={{headerShown: false}}
          component={MaintenanceService}
        />
        <Stack.Screen
          name="EmergencyService"
          options={{headerShown: false}}
          component={EmergencyService}
        />
        <Stack.Screen
          name="MapScreen"
          options={{headerShown: false}}
          component={MapScreen}
        />
        <Stack.Screen
          name="ListScreen"
          options={{headerShown: false}}
          component={ListScreen}
        />
        <Stack.Screen
          name="GarageDetail"
          options={{headerShown: false}}
          component={GarageDetail}
        />
        <Stack.Screen
          name="Booking"
          options={{headerShown: false}}
          component={Booking}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
