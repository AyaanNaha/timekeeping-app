import React, {Component} from "react";
import { View, Text } from "react-native";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

export default class Profile extends Component {

    render() {
        return (
            <View>
                <Text style={{fontSize:75}}>{user.email} {user.password}</Text>
            </View>
        )
    }
}