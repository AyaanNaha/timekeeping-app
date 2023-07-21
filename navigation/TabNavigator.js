import React, {Component} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Create from "../screens/Create";
import Schedule from "../screens/Schedule";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Schedule" component={Schedule}></Tab.Screen>
            <Tab.Screen name="Create" component={Create}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default TabNavigator;