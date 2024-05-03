import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from "react-native";
import axios from 'axios';

const Cart = ({ navigation }) => {
  const [details, setDetails] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const Token = "6|OCrbenBq2YHSUm9orQYs7D5NJL8mZF7LYTdMcANW87055ed7";
    const hotelId = "1";
    axios.get(`http://192.168.0.11:8000/api/customer/hotel/${hotelId}/menu`, {
      headers: {
        Authorization: 'Bearer ' + Token,
      },
    })
      .then(response => {
        const initialSelectedItems = {};
        response.data.menu.forEach(item => {
          initialSelectedItems[item.id] = 0;
        });
        setSelectedItems(initialSelectedItems);
        setDetails(response.data.menu);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  const increment = (id) => {
    setSelectedItems(prevSelectedItems => ({
      ...prevSelectedItems,
      [id]: prevSelectedItems[id] + 1
    }));
  }

  const decrement = (id) => {
    if (selectedItems[id] > 0) {
      setSelectedItems(prevSelectedItems => ({
        ...prevSelectedItems,
        [id]: prevSelectedItems[id] - 1
      }));
    }
  }

  const handleSelectedItem = () => {
    navigation.navigate('SelectedItem', { cartData: details, setCartData: setSelectedItems });
  }
  

  const addToCart = (item) => {
    console.log("Adding to cart:", item);
  }

  const calculateTotalCount = () => {
    return Object.values(selectedItems).reduce((total, count) => total + count, 0);
  }

  return (
    <View>
      <FlatList
        data={details}
        keyExtractor={(item) => item?.foodId?.toString()}
        renderItem={({ item }) => (
          <View style={styles.view}>
            <Text style={styles.food}>{item.name}</Text>
            <Text style={styles.type}>{item.description}</Text>
            <Text style={styles.type}>{item.price}</Text>
            <Text style={styles.type}>{item.fooditems}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={styles.add} onPress={() => addToCart(item)}>
                <Text style={{ textAlign: 'center', marginTop: 10 }}>Add</Text>
              </TouchableOpacity>
              <View style={styles.counterContainer}>
                <TouchableOpacity style={styles.decrementButton} onPress={() => decrement(item.id)}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>-</Text>
                </TouchableOpacity>
                <Text style={{ color: 'black' }}>{selectedItems[item.id]}</Text>
                <TouchableOpacity style={styles.incrementCounter} onPress={() => increment(item.id)}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 10, borderWidth: 2 }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.carttab}>
        <TouchableOpacity onPress={HandleSelectedItem}>
          <Text style={styles.cartCount}>{calculateTotalCount()}</Text>
          <Text>item(s) added to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    padding: 15,
    margin: 7,
    borderRadius: 15,
  },
  food: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  type: {
    color: 'black',
    fontSize: 15,
  },
  add: {
    marginTop: 30,
    backgroundColor: 'orangered',
    height: 40,
    width: 100,
  },
  decrementButton: {
    backgroundColor: 'orangered',
    height: 30,
    width: 30,
    padding: 5,
    margin: 10,
    borderRadius: 5,
  },
  incrementCounter: {
    backgroundColor: 'orangered',
    height: 30,
    width: 30,
    padding: 5,
    margin: 10,
    borderRadius: 5,
  },
  counterContainer: {
   
    flexDirection: 'row',
    alignItems: 'center',
  },
  carttab: {
    flexDirection: 'row',
    //position: 'absolute',
    //bottom: 16,
    backgroundColor: 'orangered',
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: 'white',
    fontWeight: 'bold',
  },
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Cart;
