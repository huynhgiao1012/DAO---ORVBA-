import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {BackHandler, View, Text} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import Profile from './Profile';
import Form from './Form';
import MainHome from './MainHome';
import {themeColors} from '../../common/theme';
import Notification from './Notification';

const Tab = createBottomTabNavigator();
const Home = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('');
  return (
    <Tab.Navigator
      initialRouteName="MainHome"
      screenOptions={({route, navigation}) => {
        // if (navigation.getState().index === 0) {
        //   setStatus('home');
        // } else if (navigation.getState().index === 1) {
        //   setStatus('form');
        // } else if (navigation.getState().index === 2) {
        //   setStatus('noti');
        // } else if (navigation.getState().index === 3) {
        //   setStatus('newfeeds');
        // } else {
        //   setStatus('info');
        // }
        return {
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === 'MainHome') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === 'Form') {
              iconName = focused ? 'receipt' : 'receipt-outline';
            } else if (rn === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
              // return (
              //   <View>
              //     <Icon name="notifications" size={size} color={color} />
              //     {unRead.length !== 0 && !navigation.isFocused() && (
              //       <View
              //         style={{
              //           backgroundColor: 'red',
              //           borderRadius: 20,
              //           width: 20,
              //           height: 20,
              //           position: 'absolute',
              //           top: -8,
              //           right: -13,
              //         }}>
              //         <Text
              //           style={{
              //             alignSelf: 'center',
              //             color: themeColors.white,
              //             fontWeight: '600',
              //           }}>
              //           {unRead.length}
              //         </Text>
              //       </View>
              //     )}
              //   </View>
              // );
            } else if (rn === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (rn === 'Newfeeds') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            }
            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            height: 50,
            backgroundColor: themeColors.white,
            borderTopWidth: 2,
            borderTopColor: themeColors.primaryColor5,
          },
          tabBarActiveTintColor: themeColors.primaryColor,
          tabBarInactiveTintColor: themeColors.primaryColor8,
          tabBarActiveBackgroundColor: themeColors.white,
          tabBarShowLabel: false,
        };
      }}>
      <Tab.Screen
        name="MainHome"
        component={MainHome}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Form" component={Form} options={{headerShown: false}} />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Home;
