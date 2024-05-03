import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation }) => {
  const [SavebuttonColor, setSaveButtonColor] = useState("white");
  const [ChangebuttonColor, setChangeButtonColor] = useState("white");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [EmailId, setEmailID] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth,setDateOfBirth] = useState('');
  

  const saveImageToStorage = async (imagePath) => {
    try {
      await AsyncStorage.setItem('profileImage', imagePath);
      console.log('Image saved to AsyncStorage:', imagePath);
    } catch (error) {
      console.log('Error saving image to AsyncStorage:', error);
    }
  };

  const handleChooseFromGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
      });
      if (image && !image.didCancel) {
        setSelectedImage(image.path);
        setUploadedImage(image.path);
        saveImageToStorage(image.path);
      }
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
      });
      if (image && !image.didCancel) {
        setSelectedPhoto(image.path);
        setUploadedImage(image.path);
        saveImageToStorage(image.path);
      }
    } catch (error) {
      console.log('Camera error:', error);
    }
  };

  const handleButtonColor = () => {
    setSaveButtonColor("#FF6A00");
    setChangeButtonColor("white");
  };

  const handleChangeButtonColor = () => {
    setChangeButtonColor("#FF6A00");
    setSaveButtonColor("white");
  };

  const handleFirstNameChange = (text) => {
    setFirstName(text);
    // Store firstName in AsyncStorage
    AsyncStorage.setItem('firstName', text)
      .then(() => console.log('First name stored successfully'))
      .catch((error) => console.error('Error storing first name:', error));
  };

  const handleLastNameChange = (text) => {
    setLastName(text);
    // Store firstName in AsyncStorage
    AsyncStorage.setItem('lastName', text)
      .then(() => console.log('First name stored successfully'))
      .catch((error) => console.error('Error storing first name:', error));
  };

  const handleEmailId = (text) => {
    setEmailID(text);
    // Store firstName in AsyncStorage
    AsyncStorage.setItem('emailId', text)
      .then(() => console.log('emailId stored successfully'))
      .catch((error) => console.error('Error storing emailId:', error));
  };

    // Update AsyncStorage whenever gender changes
  useEffect(() => {
    const saveGenderToStorage = async () => {
      try {
        await AsyncStorage.setItem('selectedGender', gender);
        console.log('Gender saved to AsyncStorage:', gender);
      } catch (error) {
        console.log('Error saving gender to AsyncStorage:', error);
      }
    };
    saveGenderToStorage();
  }, [gender]);

  const handlePhoneNumber = (text) => {
    setPhoneNumber(text);
    // Store firstName in AsyncStorage
    AsyncStorage.setItem('phoneNumber', text)
      .then(() => console.log('Phone number stored successfully'))
      .catch((error) => console.error('Error storing PHONE NUMBER:', error));
  };
  const handleDateOfBirthChange = (text) => {
    setDateOfBirth(text);
    // Store firstName in AsyncStorage
    AsyncStorage.setItem('dateOfBirth', text)
      .then(() => console.log('dateOfBirth stored successfully'))
      .catch((error) => console.error('Error storing DOB:', error));
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../images/icons8-back-50.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleChooseFromGallery}>
            <Image
              source={selectedImage ? { uri: selectedImage } : require('../images/delivery.jpg')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTakePhoto}>
            <Image
              source={selectedPhoto ? { uri: selectedImage } : require('../images/icons8-camera-30.png')}
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </View>

        <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
        <Text>First Name</Text>
        <TextInput
          style={styles.inputText}
          placeholder="First Name"
          placeholderTextColor="black"
          color="black"
          value={firstName} // Set the value of the TextInput to the state variable
          onChangeText={handleFirstNameChange} // Handle text input change
        />
      </View>

          <View style={styles.inputWrapper}>
            <Text>Last Name</Text>
            <TextInput
          style={styles.inputText}
          placeholder="Last Name"
          placeholderTextColor="black"
          color="black"
          value={lastName} // Set the value of the TextInput to the state variable
          onChangeText={handleLastNameChange} // Handle text input change
        />
          </View>

          <View style={styles.inputWrapper}>
            <Text>Email Id</Text>
            <TextInput
          style={styles.inputText}
          placeholder="Email Id"
          placeholderTextColor="black"
          color="black"
          value={EmailId} // Set the value of the TextInput to the state variable
          onChangeText={handleEmailId} // Handle text input change
        />
          </View>

          <View style={styles.inputWrapper}>
            <Text>Phone Number</Text>
            <TextInput
          style={styles.inputText}
          placeholder="Phone number"
          placeholderTextColor="black"
          color="black"
          keyboardType="phone-pad" 
          value={phoneNumber} //  state variable
          onChangeText={handlePhoneNumber} 
        />
          </View>

          <View style={styles.inputWrapper}>
  <Text>Date of Birth</Text>
  <TextInput
    style={styles.inputText}
    placeholder="Date of Birth (YYYY-MM-DD)"
    placeholderTextColor="black"
    color="black"
    keyboardType="numeric" 
    maxLength={10} 
    value={dateOfBirth}
    onChangeText={handleDateOfBirthChange} 
  />
</View>


          <View style={styles.inputWrapper}>
          <Text>Gender</Text>
        <Picker
          selectedValue={gender}
          style={styles.inputText}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: SavebuttonColor }]} onPress={handleButtonColor}>
            <Text style={styles.buttonTitle}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: ChangebuttonColor }]} onPress={handleChangeButtonColor} >
            <Text style={styles.buttonTitle}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orangered",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  headerIcon: {
    height: 25,
    width: 25,
    margin: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "900",
    marginVertical: 10,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    marginTop: "30%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 120,
    width: 120,
    borderColor: "black",
    borderWidth: 0.3,
    borderRadius: 60,
    marginLeft: 20,
    marginTop: -30,
  },
  cameraIcon: {
    height: 30,
    width: 30,
    borderColor: "white",
    //borderWidth: 0.3,
    borderRadius: 60,
    position: "relative",
    marginLeft: -20,
    marginTop: -60,
    //backgroundColor:"white"

  },
  editProfileText: {
    margin: 30,
    fontSize: 20,
    fontWeight: "500",
    color: "orangered"
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputText: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    height: 35,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    borderWidth: 0.6,
    borderColor: "black",
    borderRadius: 10,
    width: "35%",
    height: 40,
    borderRadius: 30,
  },
  buttonTitle: {
    padding: 10,
    textAlign: "center"
  },
});

export default EditProfile;
