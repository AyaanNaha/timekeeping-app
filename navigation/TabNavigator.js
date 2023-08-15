import React, {Component} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import Create from "../screens/Create";
import StackNavigator from "./StackNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
            <Tab.Screen name="Schedule" component={StackNavigator} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return (
                        <Ionicons name={focused ? "calendar" : "calendar-outline"} size={35}></Ionicons>
                    )
                }
            }}></Tab.Screen>
            <Tab.Screen name="Create" component={Create} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return (
                        <Ionicons name={focused ? "create" : "create-outline"} size={35}></Ionicons>
                    )
                }
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default TabNavigator;