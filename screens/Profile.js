import React, {Component} from "react";
import { View, Text } from "react-native";
import { auth } from "../config";
import { TouchableOpacity } from "react-native-gesture-handler";

const user = auth.currentUser;

export default class Profile extends Component {

    componentDidMount() {
        if (user) {
            console.log(user)
        }
    }

    signOut = () => {
        auth.signOut().then(() => {
            this.props.navigation.replace("Login");
        }).catch((error) =>{
            console.log(error.code + " " + error.message);
        });
        
    }

    render() {
        

        if (user != null) {
            return (
                <View>
                    <Text style={{fontSize:30}}>{user.displayName}</Text>
                    <Text style={{fontSize:30}}>{user.email}</Text>

                    <TouchableOpacity onPress={() => this.signOut()}>
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </View>
            ) 
        } else {
            return (
                <View>
                    <Text style={{fontSize:30}}>Please try again later</Text>
                </View>
            ) 
        }
    }
}