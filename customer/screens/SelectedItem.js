import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";

const SelectedItem = ({ route, navigation}) => {
  const { cartData, setCartData } = route.params;

  // Calculate total amount and total count of added items
  let totalAmount = 0;
  let totalCount = 0;
  const DeliveryFee = 50;

  const itemsToDisplay = cartData.filter((item) => {
    if (item.count > 0) {
      totalCount += item.count;
      totalAmount += item.count * item.price;
      return true;
    }
    return false;
  });

  const OrderTotal = totalAmount + DeliveryFee;

  const removeFromCart = (id) => {
    const updatedCartData = cartData.map(item => {
      if (item.id === id) {
        item.count = 0; // Set count to 0 to remove item
      }
      return item;
    });
    setCartData([...updatedCartData]);
  };

  const placeOrder = () => {
    navigation.navigate("PlaceOrder");
    console.log("Order placed!");
  };

  // Render added items
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Cart</Text>
        <Text style={styles.headerText}>Total items added: {totalCount}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.itemContainer}>
        {itemsToDisplay.map((item) => (
          <View key={item.foodId} style={styles.item}>
            <Text style={styles.itemText}>
              <Text style={styles.countText}>{item.count}</Text> *{" "}
              <Text style={styles.itemName}>{item.name}</Text>
              {" = $"}{item.price * item.count}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeFromCart(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.placeOrderBox}>
        <View style={styles.orderDetailsContainer}>
          <View style={styles.orderDetailsRow}>
            <Text style={styles.orderDetails}>Subtotal :</Text>
            <Text>${totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.orderDetailsRow}>
            <Text style={styles.orderDetails}>Delivery Fee :</Text>
            <Text>${DeliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.orderDetailsRow}>
            <Text style={styles.ordertotalText}>Order Total :</Text>
            <Text style={styles.ordertotalText}>${OrderTotal.toFixed(2)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={placeOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "orangered",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    color: "#fff",
    marginBottom: 5,
  },
  itemContainer: {
    flexGrow: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  item: {
    borderColor: "#ccc",
    borderWidth: 1,
    width: "95%",
    height: 100,
    elevation: 1,
    marginVertical: 5,
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeOrderBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 3,
  },
  orderDetailsContainer: {
    marginBottom: 10,
  },
  orderDetails: {
    marginBottom: 5,
  },
  ordertotalText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "orangered",
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
  },
  itemName: {
    fontWeight: "bold",
  },
  countText: {
    color: "orangered",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
  },
  orderDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

export default SelectedItem;
