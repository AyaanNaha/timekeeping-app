import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmedPassword: "",
            firstName: "",
            lastName: "",
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Sign Up</Text>

                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => this.setState({ firstName: text })}
                    placeholder={"Enter First Name"} placeholderTextColor={"#333"}
                ></TextInput>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => this.setState({ lastName: text })}
                    placeholder={"Enter Last Name"} placeholderTextColor={"#333"}
                ></TextInput>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => this.setState({ email: text })}
                    placeholder={"Enter Email"} placeholderTextColor={"#333"}
                ></TextInput>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => this.setState({ password: text })}
                    placeholder={"Enter Password"} placeholderTextColor={"#333"}
                ></TextInput>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => this.setState({ confirmedPassword: text })}
                    placeholder={"Confirm Password"} placeholderTextColor={"#333"}
                ></TextInput>


                <TouchableOpacity style={styles.button}>
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
        fontSize: 30,
        textAlign: "center",
        width: "75%",
        borderRadius: 15,
        backgroundColor: "#BBB",
        marginTop: 5
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