import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../../common/theme';
import {
  useGetAllServiceMutation,
  useGetCarSparesMeMutation,
  useGetSubCarSpareMeMutation,
} from '../../services/Mechanic';
import {useNavigation} from '@react-navigation/native';
import {useGetSubServiceMutation} from '../../services/Service';
useGetSubServiceMutation;
export default function Services() {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const [autoPart, setAutoPart] = useState([]);
  const [getAllService] = useGetAllServiceMutation();
  const [getCarSparesMe] = useGetCarSparesMeMutation();
  const [getSubService] = useGetSubServiceMutation();
  const [getSubCarSpare] = useGetSubCarSpareMeMutation();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setServices([]);
    setAutoPart([]);
    getAllService()
      .unwrap()
      .then(payload => {
        setServices(prev => [...prev, ...payload.carSpares]);
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
    getCarSparesMe()
      .unwrap()
      .then(payload => {
        setAutoPart(prev => [...prev, ...payload.carSpares]);
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  }, []);
  const handleOpen1 = id => {
    getSubService({id: id})
      .unwrap()
      .then(payload => {
        console.log(payload.subService);
      })
      .catch(error => {
        console.log(error);
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  };
  const handleOpen2 = id => {};
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <View
        style={{
          padding: 15,
          borderBottomWidth: 2,
          borderBottomColor: '#e8e8e8',
        }}>
        <Text
          style={{
            color: themeColors.primaryColor,
            fontSize: 18,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          SERVICES & CAR-SPARES
        </Text>
      </View>
      <Text
        style={{
          color: themeColors.primaryColor7,
          fontSize: 18,
          fontWeight: '700',
          marginHorizontal: 20,
          marginVertical: 10,
          fontStyle: 'italic',
        }}>
        I. SERVICES
      </Text>
      <View style={{height: 280}}>
        <ScrollView>
          <View>
            {services.length > 0 &&
              services.map((val, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleOpen1(val._id)}
                    style={{
                      padding: 15,
                      marginVertical: 10,
                      marginHorizontal: 20,
                      backgroundColor: themeColors.primaryColor4,
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: themeColors.white,
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      {val.serviceName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </View>
      <Text
        style={{
          color: themeColors.primaryColor7,
          fontSize: 18,
          fontWeight: '700',
          marginHorizontal: 20,
          marginVertical: 10,
          fontStyle: 'italic',
        }}>
        II. CAR-SPARES
      </Text>
      <View style={{height: 280}}>
        <ScrollView>
          <View>
            {autoPart.length > 0 &&
              autoPart.map((val, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleOpen2(val._id)}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                      marginVertical: 10,
                      marginHorizontal: 20,
                      borderRadius: 8,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: themeColors.primaryColor5,
                    }}>
                    <Image
                      source={{uri: val.img}}
                      style={{
                        width: 80,
                        height: 50,
                        marginRight: 20,
                      }}
                    />
                    <Text
                      style={{
                        color: themeColors.primaryColor7,
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      {val.brand}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
