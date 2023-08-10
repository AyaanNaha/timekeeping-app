import React, {Component} from "react";
import { View, Text, StyleSheet } from "react-native";
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
                <View style={styles.container}>
                    <Text style={{fontSize:auth.currentUser.displayName.length * -1/2 + 60, alignText:"center"}}>{auth.currentUser.displayName}</Text>
                    <Text style={{fontSize:auth.currentUser.email.length * -1/2 + 40}}>{auth.currentUser.email}</Text>

                    <TouchableOpacity onPress={() => this.signOut()} style={styles.button}>
                        <Text style={styles.text}>Log Out</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DDD"
    },
    text: {
        fontSize: 40,
        color: "#222",
        textAlign: "center",
        margin:10
    },
    button: {
        borderWidth: 4,
        borderColor: "#666",
        fontSize: 40,
        textAlign: "center",
        width: "50%",
        borderRadius: 25,
        backgroundColor: "#aaa",
        marginTop: 20,
        marginBottom: -15
    }
})