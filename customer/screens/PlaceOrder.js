import { StyleSheet, Text, View, Image , TouchableOpacity } from 'react-native';
import React from 'react';

const placeOrder = ({navigation}) => {
  const HandleDone = () => {
    navigation.navigate("home");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../images/icons8-success-60.png')} 
        style={styles.image}
      />
      <Text style={styles.text}>successFully Ordered</Text>
      {/* <Text style={styles.text}>Your Order is 
      successfully Ordered</Text> */}
      <TouchableOpacity style={styles.button} onPress={HandleDone} >
        <Text style={{fontFamily: 'Poppins-Bold',fontSize:18,color:"white"}}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default placeOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginTop: 10, 
    fontFamily: 'Poppins-Regular',
    color:"black"
  },
  image: {
    width: 50, 
    height: 50,
    marginBottom: 10, 
  },
  button: {
    width:"80%",
    height: 50,
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#ff4500',
    padding: 10,
    borderRadius: 20,
  }
});
