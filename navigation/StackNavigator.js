import react from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Schedule from "../screens/Schedule";
import EventScreen from "../screens/EventScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Schedule" component={Schedule}></Stack.Screen>
            <Stack.Screen name="EventScreen" component={EventScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default StackNavigator;