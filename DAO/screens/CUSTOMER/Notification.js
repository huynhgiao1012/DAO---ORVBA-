import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
  ScrollViewBase,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import {themeColors} from '../../common/theme';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function NotiScreen() {
  const navigation = useNavigation();
  const [status, setStatus] = useState('new');
  const [unRead, setUnread] = useState([
    {text: 'New Notification', status: 'read', _id: 1},
    {text: 'New Notification', status: 'unread', _id: 2},
  ]);
  // useEffect(() => {
  //   getUnreadNoti()
  //     .unwrap()
  //     .then(payload => {
  //       setUnread([]);
  //       console.log(payload);
  //       if (payload) {
  //         setUnread(prev => [...prev, ...payload.data].reverse());
  //       }
  //     });
  // }, []);

  // const handlePress = id => {
  //   setStatus('old');
  //   updateNoti({id: id})
  //     .unwrap()
  //     .then(() => {
  //       getUnreadNoti()
  //         .unwrap()
  //         .then(payload => {
  //           setUnread([]);
  //           if (payload) {
  //             setUnread(prev => [...prev, ...payload.data]);
  //           }
  //         });
  //     });
  // };
  const rightSwipe = (dragX, id) => {
    const scale = dragX.interpolate({
      inputRange: [1, 100],
      outputRange: [1.2, 0.6],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => onDelete(id)}>
        <View style={styles.deleteBox}>
          <Animated.Text
            style={{
              transform: [{scale: scale}],
            }}>
            <Icon name="trash" size={22} color={themeColors.white} />
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  const onDelete = id => {
    //   deleteNoti({id: id})
    //     .unwrap()
    //     .then(payload => {
    //       if (payload.success === true) {
    //         getUnreadNoti()
    //           .unwrap()
    //           .then(payload => {
    //             setUnread([]);
    //             if (payload) {
    //               setUnread(prev => [...prev, ...payload.data].reverse());
    //             }
    //           });
    //       }
    //     });
  };

  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderBottomWidth: 8,
          borderBottomColor: '#e8e8e8',
        }}>
        <Text
          style={{
            color: themeColors.primaryColor4,
            fontSize: 22,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          Notification
        </Text>
      </View>
      <ScrollView style={{marginHorizontal: 20}}>
        {unRead.map(val => {
          if (val.status === 'unread') {
            return (
              <TouchableOpacity
                onPress={() => handlePress(val._id)}
                key={val._id}>
                <View style={styles.container}>
                  {status === 'new' && (
                    <View
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: 25,
                        backgroundColor: 'red',
                        padding: 8,
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          color: themeColors.white,
                          fontSize: 10,
                          fontWeight: '700',
                        }}>
                        New
                      </Text>
                    </View>
                  )}
                  <Text style={styles.text3}>From ABCDEF</Text>
                  <Text style={styles.text1}>{val.text}</Text>
                </View>
              </TouchableOpacity>
            );
          }
          if (val.status === 'read') {
            return (
              <Swipeable
                renderRightActions={dragX => rightSwipe(dragX, val._id)}
                key={val._id}>
                <View style={styles.container}>
                  <Text style={styles.text3}>From ABCDEF</Text>
                  <Text style={styles.text2}>{val.text}</Text>
                </View>
              </Swipeable>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH - 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomColor: themeColors.primaryColor5,
    borderBottomWidth: 2,
  },
  deleteBox: {
    backgroundColor: themeColors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    marginVertical: 10,
  },
  text1: {
    color: themeColors.primaryColor7,
    fontSize: 18,
    fontWeight: '800',
    width: '90%',
    marginTop: 5,
  },
  text2: {
    color: themeColors.primaryColor6,
    fontSize: 18,
    width: '90%',
    fontWeight: '700',
  },
  text3: {
    color: themeColors.primaryColor6,
    fontSize: 14,
    width: '90%',
    fontWeight: '700',
  },
});
