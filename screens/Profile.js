import React, {Component} from "react";
import { View, Text } from "react-native";
import { auth } from "../config";
import { TouchableOpacity } from "react-native-gesture-handler";



export default class Profile extends Component {

    componentDidMount() {
        if (auth.currentUser) {
            console.log(auth.currentUser)
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
        

        if (auth.currentUser != null) {
            return (
                <View>
                    <Text style={{fontSize:30}}>{auth.currentUser.displayName}</Text>
                    <Text style={{fontSize:30}}>{auth.currentUser.email}</Text>

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