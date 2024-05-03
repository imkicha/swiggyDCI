import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Modal } from "react-native";
import { FlatList } from "react-native";
import Swiper from 'react-native-swiper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage


const data = [
    { id: 1, title: "Briyani", src: require("../images/briyani.jpg") },
    { id: 3, title: "Pizza", src: require("../images/pizza.webp") },
    { id: 4, title: "Pasta", src: require("../images/pasta.webp") },
    { id: 5, title: "Beverage", src: require("../images/juice.jpg") },
    { id: 6, title: "Pizza", src: require("../images/pizza.webp") }
];





const Homepage = ({ route, navigation }) => {
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const { selectedImage } = route.params || {};
    const [Hotel, setHotel] = useState([]);

    useEffect(() => {
        const Token = "6|OCrbenBq2YHSUm9orQYs7D5NJL8mZF7LYTdMcANW87055ed7"
        axios.get('http://192.168.0.11:8000/api/customer/hotels', {
            headers: {
              Authorization: 'Bearer ' + Token,
            },
          })
          .then(response => {
            
            setHotel(response.data);
            console.log(setHotel);
            
          })
          .catch(error => {
            console.error('Error fetching menu data:', error);
          });
    }, []);

    useEffect(() => {
        const getProfileImage = async () => {
            try {
                const imagePath = await AsyncStorage.getItem('profileImage'); // Retrieve image path from AsyncStorage
                if (imagePath !== null) {
                    setProfileImage(imagePath);
                    console.log('Retrieved profile image from AsyncStorage:', imagePath);
                }
            } catch (error) {
                console.log('Error retrieving profile image from AsyncStorage:', error);
            }
        };

        getProfileImage();
    }, []);

    const HandleProfile = () => {
        navigation.navigate('Profile');
    };

    const handleHotelPress = (hotel) => {
        setSelectedHotel(hotel);
    };

    const handleCloseModal = () => {
        setSelectedHotel(null);
    };

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>

            <View style={styles.Searchcontainer}>
                {/* <TouchableOpacity>
                        <Image source={require('../images/icons8-menu-32.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity> */}
                <View style={styles.search}>
                    <TouchableOpacity>
                        <Image source={require('../images/search.png')} style={{ height: 25, width: 25, margin: 10 }} />
                    </TouchableOpacity>
                    <TextInput placeholder="Search Food" placeholderTextColor="black" color="black" />
                </View>
                <TouchableOpacity onPress={HandleProfile} style={{ alignSelf: "center", borderColor: "black", borderWidth: 1, borderRadius: 40, height: 40, width: 40 }}>
                    <Image source={selectedImage ? { uri: selectedImage } : profileImage ? { uri: profileImage } : require('../images/icons8-user-48.png')} style={styles.profileIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.SliderContainer}>
                <Swiper height={200} autoplay={true} activeDotColor="#ffffff">
                    <View style={styles.slide}>
                        <Image source={require("../images/offerbanner.jpg")} style={styles.sliderImage} resizeMode="cover" />
                    </View>
                    <View style={styles.slide}>
                        <Image source={require("../images/banner4.webp")} style={styles.sliderImage} resizeMode="cover" />
                    </View>
                    <View style={styles.slide}>
                        <Image source={require("../images/banner2.webp")} style={styles.sliderImage} resizeMode="cover" />
                    </View>
                </Swiper>
            </View>
            <View>
                <FlatList
                    horizontal={true}
                    style={{ paddingVertical: 5, paddingHorizontal: 5 }}
                    contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{}}>
                            <TouchableOpacity onPress={() => { navigation.navigate('cart') }}>
                                <Image
                                    source={item.src}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderWidth: 1,
                                        margin: 10,
                                        borderRadius: 50,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>{item.title}</Text>
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <ScrollView>
                <View>
                    <Text style={styles.headings}>Hotels</Text>
                </View>
                <FlatList
                    data={Hotel}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { navigation.navigate('cart') }}>
                            <View style={styles.hotelItem}>
                                <View style={{ flex: 0.7 }}>
                                    <Text style={styles.name}>{item.name}</Text> 
                                </View>
                                <View style={{ flex: 0.3 }}>
                                    <Image source={require("../images/offerbanner.jpg")} style={styles.foodpic} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={!!selectedHotel}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedHotel?.name}</Text>
                        <Image source={selectedHotel?.image} style={styles.modalImage} />
                        <Text style={styles.modalDescription}>{selectedHotel?.description}</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}




const styles = StyleSheet.create({
    Searchcontainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
    },
    search: {
        width: "80%",
        borderWidth: 1,
        margin: 20,
        alignContent: 'center',
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        borderColor: 'black',

    },
    name: {
        color: 'black',
        fontSize: 20,
        margin: 10,
        marginLeft: 0,

    },
    foodpic: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    headings: {
        color: 'black',
        fontSize: 20,
        marginTop: 15,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    SliderContainer: {
        height: 200,
        width: "90%",
        marginTop: 10,
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 8,

    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "transparent",
        borderRadius: 8,
    },
    sliderImage: {
        height: "100%",
        width: "100%",
        alignSelf: "center",
        borderRadius: 8
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: "orangered",
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    closeButtonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
    },
    hotelItem: {
        flexDirection: "row",
        margin: 10,
        //backgroundColor:"red"
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderColor: "white",
        borderWidth: 1,
        alignSelf: "center"
    }
})

export default Homepage;