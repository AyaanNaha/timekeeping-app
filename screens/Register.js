import React, {Component} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmedPassword:"",
            firstName:"",
            lastName:"",
        }
    }

    render() {
        return (
            <View>
                <TextInput
                style={styles.text}
                    onChangeText={text => this.setState({firstName: text})}
                    placeholder={"Enter First Name"}
                ></TextInput>
                <TextInput
                style={styles.text}
                    onChangeText={text => this.setState({lastName: text})}
                    placeholder={"Enter Last Name"}
                ></TextInput>
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
                <TextInput
                style={styles.text}
                    onChangeText={text => this.setState({confirmedPassword: text})}
                    placeholder={"Confirm Password"}
                ></TextInput>

                
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