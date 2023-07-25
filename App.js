import React, {Component} from "react";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";


const Stack = createStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default class App extends Component {

  render () {
    return(
      <NavigationContainer>
        <StackNav/>
      </NavigationContainer>
    )
  }
}