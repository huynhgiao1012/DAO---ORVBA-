import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {themeColors} from '../../common/theme';
import FormItem from '../../common/FormItem';
import {useGetAllFormMutation} from '../../services/Customer';

export default function AllForm() {
  const [active, setActive] = useState(0);
  const [getAllForm] = useGetAllFormMutation();
  const [form, setForm] = useState([]);
  const [filter, setArr] = useState([]);
  const handleFilter = num => {
    setActive(num);
    console.log(num);
    if (num === 0) {
      setArr(prev => [...prev, ...form]);
    } else if (num === 1) {
      setArr([]);
      const arr = form.map(val => {
        if (val.status === 'await') {
          return val;
        }
      });
      setArr(prev => [...prev, ...arr]);
    } else if (num === 2) {
      setArr([]);
      const arr = form.map(val => {
        if (val.status === 'process') {
          return val;
        }
      });
      setArr(prev => [...prev, ...arr]);
    } else {
      setArr([]);
      const arr = form.map(val => {
        if (val.status === 'done') {
          return val;
        }
      });
      setArr(prev => [...prev, ...arr]);
    }
  };
  useEffect(() => {
    setForm([]);
    setArr([]);
    getAllForm()
      .unwrap()
      .then(payload => setForm(prev => [...prev, ...payload.orderForm]))
      .catch(error => error);
  }, []);
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
      {filter.length > 0 ? (
        filter.map((val, index) => {
          return <FormItem data={val} key={index} />;
        })
      ) : (
        <Text
          style={{
            fontWeight: '700',
            color: themeColors.primaryColor6,
            fontSize: 16,
            alignSelf: 'center',
            fontStyle: 'italic',
          }}>
          No results
        </Text>
      )}
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
