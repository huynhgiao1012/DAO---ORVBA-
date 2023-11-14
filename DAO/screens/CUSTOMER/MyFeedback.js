import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {themeColors} from '../../common/theme';
import FormItem from '../../common/FormItem';
import Header2 from '../../common/Header2';
export default function MyFeedback() {
  const [active, setActive] = useState(0);
  const handleFilter = num => {
    setActive(num);
  };
  return (
    <ScrollView style={{backgroundColor: themeColors.white}}>
      <Header2 name="My Feedback" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 15,
        }}>
        <TouchableOpacity
          onPress={() => handleFilter(0)}
          style={[
            styles.btn,
            {
              backgroundColor:
                active === 0
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.btn_text}>Not Rated</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFilter(1)}
          style={[
            styles.btn,
            {
              backgroundColor:
                active === 1
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.btn_text}>Rated</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: themeColors.primaryColor5,
    width: '50%',
  },
  btn_text: {
    fontWeight: '700',
    color: themeColors.white,
    fontSize: 18,
    textAlign: 'center',
  },
});
