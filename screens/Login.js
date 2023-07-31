import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config";
import { ref, set, update } from "firebase/database";

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
            /* DEPRECATED WEB NAMESPACED API
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
            this.props.navigation.replace("DrawerNavigator");
            })
            .catch((error) => {
                console.log(error);
            });
             */

            // WEB MODULAR API

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // console.log(user);
                    console.log("logged in user " + user.displayName);
                    auth.updateCurrentUser(user);

                    // update(ref(database, '/users/' + user.uid), {
                    //     lastLoginAt: new Date().toDateString()
                    // })

                    this.props.navigation.replace("DrawerNavigator");
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Sign in</Text>

                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => this.setState({ email: text })}
                    placeholder={"Enter Email"}
                    placeholderTextColor={"#333"}
                ></TextInput>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => this.setState({ password: text })}
                    placeholder={"Enter Password"}
                    placeholderTextColor={"#333"}
                ></TextInput>

                <TouchableOpacity onPress={() => this.login(this.state.email, this.state.password)}
                    style={styles.button}>
                    <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
            </View>
        )
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
        textAlign: "center"
    },
    inputBox: {
        borderWidth: 4,
        borderColor: "#333",
        fontSize: 20,
        textAlign: "center",
        width: "75%",
        borderRadius: 15,
        backgroundColor: "#BBB",
        marginTop: 5,
        padding:5
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