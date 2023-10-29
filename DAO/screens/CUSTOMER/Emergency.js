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

export default function Emergency() {
  const [active, setActive] = useState(0);
  const handleFilter = num => {
    setActive(num);
  };
  return (
    <ScrollView style={{backgroundColor: themeColors.white}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
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
          <Text style={styles.btn_text}>All</Text>
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
          <Text style={styles.btn_text}>Wait</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFilter(2)}
          style={[
            styles.btn,
            {
              backgroundColor:
                active === 2
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.btn_text}>Process</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFilter(3)}
          style={[
            styles.btn,
            {
              backgroundColor:
                active === 3
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.btn_text}>Paid</Text>
        </TouchableOpacity>
      </View>
      <FormItem />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: themeColors.primaryColor5,
    borderRadius: 10,
  },
  btn_text: {
    fontWeight: '700',
    color: themeColors.white,
  },
});
