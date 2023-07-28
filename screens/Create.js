import React, {Component} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export default class Create extends Component {
    constructor() {
        super();
        this.state = {
            title:"",
            description:"",
            startTime:"",
            endTime:"",
            color:""
        }
    }

    createEvent = (title, description, startTime, endTime, color) => {
        if (title == "" || description == "" || startTime == "") {
            alert("Please fill all fields")
            return;
        }
        
        alert("Made new event\ntitle: " + title + 
        "\ndesctiption: " + description + 
        "\nstartTime: " + startTime +
        "\nendTime: " + endTime +
        "\ncolor: " + color)
    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => this.setState({ title: text })}
                    placeholder={"Enter Title (Required)"} placeholderTextColor={"#333"}
                ></TextInput>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => this.setState({ description: text })}
                    placeholder={"Enter Description (Required)"} placeholderTextColor={"#333"}
                ></TextInput>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => this.setState({ startTime: text })}
                    placeholder={"Enter Starting Time (Required)"} placeholderTextColor={"#333"}
                ></TextInput>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => this.setState({ endTime: text })}
                    placeholder={"Enter Ending Time"} placeholderTextColor={"#333"}
                ></TextInput>
                <DropDownPicker
                items={[
                    {label: "red", value: "red"},
                    {label: "green", value: "green"},
                    {label: "blue", value: "blue"},
                    {label: "yellow", value: "yellow"},
                    {label: "cyan", value: "cyan"},
                    {label: "magenta", value: "magenta"},
                  ]}
                  defaultValue={this.state.color}
                  open={this.state.dropdownHeight == 170 ? true : false}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{
                    backgroundColor: this.state.color,
                    borderWidth: 1,
                    borderColor: 'black',
                  }}
                  textStyle={{
                    color: 'black',
                  }}
                  onSelectItem={(item) => {
                    this.setState({
                      color: item.value,
                    });
                  }}
                >
                </DropDownPicker>

                <TouchableOpacity onPress={() => this.createEvent(this.state.title, this.state.description, this.state.startTime, this.state.endTime, this.state.color)}
                    style={styles.button}>
                    <Text style={styles.text}>Submit</Text>
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
        fontSize: 15,
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