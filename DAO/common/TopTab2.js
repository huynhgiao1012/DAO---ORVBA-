import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {themeColors} from './theme';
import MeForm from '../screens/MECHANIC/MeForm1';
import MeForm2 from '../screens/MECHANIC/UpdateBefore';
const Tab = createMaterialTopTabNavigator();
export default function TopTab2() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: themeColors.primaryColor,
        tabBarInactiveTintColor: themeColors.primaryColor8,
        tabBarIndicatorStyle: {
          borderBottomColor: themeColors.primaryColor,
          borderBottomWidth: 3,
        },
        tabBarLabelStyle: {fontWeight: '700', fontSize: 16},
      }}>
      <Tab.Screen name="MeForm" component={MeForm} />
    </Tab.Navigator>
  );
}
