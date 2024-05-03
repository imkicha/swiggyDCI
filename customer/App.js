import React from "react";
 import { NavigationContainer } from "@react-navigation/native";
 import { useEffect } from "react";
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import Login from "./screens/login";
 import Signup from "./screens/signup";
 import Forgot from "./screens/forgot";
 import Homepage from "./screens/home";
 import Cart from "./screens/cart";
 import SplashScreen from "react-native-splash-screen";
import SelectedItem from "./screens/SelectedItem";
import placeOrder from "./screens/PlaceOrder";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";


 const Stack = createNativeStackNavigator();

 const app=()=>{

   useEffect(() =>{ 
     SplashScreen.hide();
   },[]);
  
   return(
     <NavigationContainer>
 <Stack.Navigator>
 <Stack.Screen name="Login" component={Login} /> 
 <Stack.Screen name="signup" component={Signup} />
 <Stack.Screen name="forgot" component={Forgot} />
 <Stack.Screen name="home" component={Homepage} />
 <Stack.Screen name="cart" component={Cart} />
 <Stack.Screen name="SelectedItem" component={SelectedItem} options={{ headerShown: false }} />
 <Stack.Screen name="PlaceOrder" component={placeOrder} options={{ headerShown: false }} />
 <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
 <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />

 </Stack.Navigator>
 </NavigationContainer>
   )
 }
 export default app;

