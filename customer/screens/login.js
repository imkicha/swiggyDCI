import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Login = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../images/login.png')}
                />
            </View>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <Image source={require('../images/mobile.png')} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Mobile Number"
                        placeholderTextColor="black"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Image source={require('../images/password.png')} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="black"
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('forgot')} style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                    <Text style={[styles.signupText, styles.signupLink]}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'orangered',
        textAlign: 'center',
        marginVertical: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputWrapper: {
        width:"80%",
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 50,
        marginBottom: 10,
    },
    inputIcon: {
        width: 25,
        height: 25,
        marginHorizontal: 10,
    },
    input: {
        flex: 1,
        color: 'black',
        paddingHorizontal: 10,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: 'black',
    },
    loginButton: {
        backgroundColor: 'orangered',
        borderRadius: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '80%',
    },
    loginButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        paddingHorizontal: 20,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    signupText: {
        fontSize: 16,
        color: 'black',
    },
    signupLink: {
        color: 'orangered',
        marginLeft: 5,
    },
});

export default Login;
