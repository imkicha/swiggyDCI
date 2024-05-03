import { StyleSheet, Text, View, Image,ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Profile = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [EmailId, setEmailID] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');

  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };


  const handleprofileImage = () => {

  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Fetch function from AsyncStorage when the profile page is focused
      loadFirstName();
      loadEmailId();
      loadSelectedGender();
      loadPhoneNumber();
      loadDateOfBirth();
      loadLastName();

    });

    // Unsubscribe from the event when component unmounts
    return unsubscribe;
  }, [navigation]);

  const loadFirstName = async () => {
    try {
      const storedFirstName = await AsyncStorage.getItem('firstName');
      if (storedFirstName !== null) {
        setFirstName(storedFirstName);
      }
    } catch (error) {
      console.error('Error retrieving first name:', error);
    }
  };

  const loadLastName = async () => {
    try {
      const storedLastName = await AsyncStorage.getItem('lastName');
      if (storedLastName !== null) {
        setLastName(storedLastName);
      }
    } catch (error) {
      console.error('Error retrieving first name:', error);
    }
  };

  const loadEmailId = async () => {
    try {
      const storedEmailId = await AsyncStorage.getItem('emailId'); // Corrected key we haverto  here
      if (storedEmailId !== null) {
        setEmailID(storedEmailId);
      }
    } catch (error) {
      console.error('Error retrieving email:', error);
    }
  };

  const loadSelectedGender = async () => {
    try {
      const storedGender = await AsyncStorage.getItem('selectedGender');
      if (storedGender !== null) {
        setSelectedGender(storedGender);
      }
    } catch (error) {
      console.error('Error retrieving selected gender:', error);
    }
  };

  const loadPhoneNumber = async () => {
    try {
      const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber'); // Corrected key we haverto  here
      if (storedPhoneNumber !== null) {
        setPhoneNumber(storedPhoneNumber);
      }
    } catch (error) {
      console.error('Error retrieving email:', error);
    }
  };


  const loadDateOfBirth = async () => {
    try {
      const storedDateOfBirth = await AsyncStorage.getItem('dateOfBirth'); // Corrected key we haverto  here
      if (storedDateOfBirth !== null) {
        setDateOfBirth(storedDateOfBirth);
      }
    } catch (error) {
      console.error('Error retrieving email:', error);
    }
  };



  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.editContainer}>
          <TouchableOpacity style={{ alignItems: "flex-start" }} onPress={handleGoBack}>
            <Image
              source={require('../images/icons8-back-50.png')}
              style={styles.BackImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit}>
            <Image
              source={require('../images/icons8-edit-file-64.png')}
              style={styles.editImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleprofileImage}>
            <Image
              source={selectedImage ? { uri: selectedImage } : require('../images/delivery.jpg')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={{ color: "white", padding: 10, fontSize: 20 }}>Hi {firstName}</Text>
        </View>
      </View>
      
        <View style={{ flex: 0.6 }}>
          <View style={{ margin: 20 }}>
            <Text style={{ color: 'black' }}>Name</Text>
            <View style={styles.inputContainer}>
              <Image
                source={require('../images/icons8-user-48.png')}
                style={styles.image}
              />
              <Text style={{ margin: 10, color: "black" }}>{firstName}{LastName}</Text>
            </View>
          </View>
          <View style={{ margin: 20 }}>
            <Text style={{ color: 'black' }}>Email Id</Text>
            <View style={styles.inputContainer}>
              <Image
                source={require('../images/icons8-email-50.png')}
                style={styles.image}
              />
              <Text style={{ margin: 10, color: "black" }}>{EmailId}</Text>
            </View>
          </View>
          <View style={{ margin: 20 }}>
            <Text style={{ color: 'black' }}>Phone number</Text>
            <View style={styles.inputContainer}>
              <Image
                source={require('../images/icons8-phone-80.png')}
                style={styles.image}
              />
              <Text style={styles.countryCode}>+91</Text>
              <Text style={{ margin: 10, color: "black" }}>{PhoneNumber}</Text>
            </View>
          </View>
          <View style={{ margin: 20 }}>
            <Text style={{ color: 'black' }}>Date of Birth</Text>
            <View style={styles.inputContainer}>
              <Image
                source={require('../images/icons8-identity-card-50.png')}
                style={styles.image}
              />
              <Text style={{ margin: 10, color: "black" }}>{DateOfBirth}</Text>
            </View>
          </View>
          <View style={{ margin: 20 }}>
            <Text style={{ color: 'black' }}>Gender</Text>
            <View style={styles.inputContainer}>
              <Image
                source={require('../images/icons8-identity-card-50.png')}
                style={styles.image}
              />
              <Text style={{ margin: 10, color: "black" }}> {selectedGender}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    backgroundColor: 'orangered',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  editContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    //backgroundColor:"white"
  },
  editImage: {
    width: 30,
    height: 30,
  },
  BackImage: {
    width: 30,
    height: 30,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: 'white',
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '98%',
  },
  inputText: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 20,
    height: 20,
  },
  countryCode: {
    marginRight: 2,
    color: 'black',
  },
});

