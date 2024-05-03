import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";

const Signup = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../images/login.png')}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="black"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="black"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mail Id"
                    placeholderTextColor="black"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mobile Number"
                    placeholderTextColor="black"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="black"
                    secureTextEntry
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.button}>
                <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        marginBottom: 20,
    },
    image: {
        width: 120,
        height: 120,
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'orangered',
        width: '80%',
        borderRadius: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
});

export default Signup;
