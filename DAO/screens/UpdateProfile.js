import {View, Button, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header2 from '../common/Header2';
import {themeColors} from '../common/theme';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function UpdateProfile() {
  const [selectedImage, setSelectedImage] = useState('');
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        console.log(response);
        setSelectedImage(imageUri);
      }
    });
  };
  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(response);
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: themeColors.white}}>
      <Header2 name="Update Profile" />
      <View
        style={{
          alignSelf: 'center',
          padding: 10,
          marginVertical: 20,
          width: 240,
          borderWidth: 3,
          borderColor: '#f8f8f8',
          borderRadius: 10,
        }}>
        {selectedImage.length > 0 ? (
          <Image
            source={{uri: selectedImage}}
            style={{width: '100%', height: 180, marginBottom: 10}}
          />
        ) : (
          <View style={{alignSelf: 'center', marginBottom: 10, height: 160}}>
            <Icon name="image" size={100} color="#e8e8e8" />
          </View>
        )}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={handleCameraLaunch}
            style={{
              width: '50%',
              alignItems: 'center',
              padding: 10,
              backgroundColor: themeColors.primaryColor7,
            }}>
            <Icon name="camera" size={20} color={themeColors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openImagePicker}
            style={{
              width: '50%',
              alignItems: 'center',
              padding: 10,
              backgroundColor: themeColors.primaryColor,
            }}>
            <Icon name="upload" size={20} color={themeColors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
