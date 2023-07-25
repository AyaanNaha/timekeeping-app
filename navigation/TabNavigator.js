import React, {Component} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import Create from "../screens/Create";
import Schedule from "../screens/Schedule";
import StackNavigator from "./StackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Schedule" component={StackNavigator}></Tab.Screen>
            <Tab.Screen name="Create" component={Create}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default TabNavigator;