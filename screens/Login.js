import React, {Component} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import * as firebase from "firebase";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }

    login = (email, password) => {
        if (email.length < 1 || password.length < 1) {
            alert("Please fill all the fields");
        } else {
            // firebase.auth().signInWithEmailAndPassword(email, password)
            //     .then(() => {
                    this.props.navigation.replace("DrawerNavigator");
                // })
                // .catch((error) => {
                //     console.log(error)
                // });
        }
        
    }

    render() {
        return (
            <View>
                <Text style={styles.text}> Login Screen</Text>

                <TextInput
                style={styles.text}
                    onChangeText={text => this.setState({email: text})}
                    placeholder={"Enter Email"}
                ></TextInput>
                <TextInput
                style={styles.text}
                    onChangeText={text => this.setState({password: text})}
                    placeholder={"Enter Password"}
                ></TextInput>

                <TouchableOpacity onPress={() => this.login(this.state.email, this.state.password)}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text:{
        fontSize:40
    }
})