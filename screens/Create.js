import React, {Component} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { database } from "../config";

export default class Create extends Component {
    constructor() {
        super();
        this.state = {
            title:"",
            description:"",
            startTime:"",
            endTime:"",
            color:"",
            repeats:{
                SUN:false,
                MON:false,
                TUE:false,
                WED:false,
                THU:false,
                FRI:false,
                SAT:false,
            },
            date:""
        }
    }

    createEvent = (title, description, startTime, endTime, color, date, repeats) => {
        if (title == "" || description == "" || startTime == "" || date == "") {
            alert("Please fill all fields")
            return;
        }

        var eventDate = new Date(date).toDateString();
        
        var eventRepeats = false;
        for(var i = 0; i < repeats.length; i++) {
            if(repeats[i]) {
                eventRepeats = true;
            }
        }

        if(eventRepeats) {
            this.createRepeatingEvent(title, description, startTime, endTime, color, eventDate, repeats)
        } else {
            this.createScheduledEvent(title, description, startTime, endTime, color, eventDate)
        }
    }

    createRepeatingEvent = (title, description, startTime, endTime, color, date, repeats) => {
        
        var dateRefIsNull = false
        const eventRef = ref(database, `events/${auth.currentUser.uid}/${date}/`);
        onValue(eventRef, (snapshot) => {
            if(snapshot.val() == null) {
                dateRefIsNull = true;
            }
        })

        if(dateRefIsNull) {
            var id;
            if (startTime.toUpperCase().contains("PM")) {
                startTimeSplit = startTime.split(":");
                id = parseInt(startTimeSplit[0]) + 12;
            }

            //ADD CODE TO CREATE THE EVENT JSON TO ADD INTO DATABASE

            var repeatingEventsRef = ref(database, `events/${auth.currentUser.uid}/repeatingEvents`);
            for(var i = 0; i < repeats.length; i++) {
                if(repeats[i]) {
                    //ENTER CODE FOR TO ADD THE EVENT INTO EACH DAY IT REPEATS HERE
                }
            }
            
        }
    }

    createScheduledEvent = (title, description, startTime, endTime, color, date) => {

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
                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => this.setState({ date: text })}
                    placeholder={"Enter date (mm/dd/yyyy)"} placeholderTextColor={"#333"}
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

                <Text>Repeats:</Text>

                <View style={styles.repeatSwitchContainer}>
                    <Text style={styles.repeatText}>Sunday </Text>
                    <Switch
                        trackColor={{
                            false: "#767577",
                            true: "#00dd00"
                        }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            this.setState({
                                repeats: { SUN: !this.state.repeats.SUN }
                            })
                        }}
                        value={this.state.repeats.SUN}>
        
                        </Switch>
                </View>

                <View style={styles.repeatSwitchContainer}>
                    <Text style={styles.repeatText}>Monday </Text>
                    <Switch
                        trackColor={{
                            false: "#767577",
                            true: "#00dd00"
                        }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            this.setState({
                                repeats: { MON: !this.state.repeats.MON }
                            })
                        }}
                        value={this.state.repeats.MON}>
        
                        </Switch>
                </View>

                <View style={styles.repeatSwitchContainer}>
                    <Text style={styles.repeatText}>Tuesday </Text>
                    <Switch
                        trackColor={{
                            false: "#767577",
                            true: "#00dd00"
                        }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            this.setState({
                                repeats: { TUE: !this.state.repeats.TUE }
                            })
                        }}
                        value={this.state.repeats.TUE}>
        
                        </Switch>
                </View>

                <View style={styles.repeatSwitchContainer}>
                    <Text style={styles.repeatText}>Wednesday </Text>
                    <Switch
                        trackColor={{
                            false: "#767577",
                            true: "#00dd00"
                        }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            this.setState({
                                repeats: { WED: !this.state.repeats.WED }
                            })
                        }}
                        value={this.state.repeats.WED}>
        
                        </Switch>
                </View>

                <View style={styles.repeatSwitchContainer}>
                    <Text style={styles.repeatText}>Thursday </Text>
                    <Switch
                        trackColor={{
                            false: "#767577",
                            true: "#00dd00"
                        }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            this.setState({
                                repeats: { THU: !this.state.repeats.THU }
                            })
                        }}
                        value={this.state.repeats.THU}>
        
                        </Switch>
                </View>

                <View style={styles.repeatSwitchContainer}>
                    <Text style={styles.repeatText}>Friday </Text>
                    <Switch
                        trackColor={{
                            false: "#767577",
                            true: "#00dd00"
                        }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            this.setState({
                                repeats: { FRI: !this.state.repeats.FRI }
                            })
                        }}
                        value={this.state.repeats.FRI}>
        
                        </Switch>
                </View>

                <View style={styles.repeatSwitchContainer}>
                    <Text style={styles.repeatText}>Saturday </Text>
                    <Switch
                        trackColor={{
                            false: "#767577",
                            true: "#00dd00"
                        }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            this.setState({
                                repeats: { SAT: !this.state.repeats.SAT }
                            })
                        }}
                        value={this.state.repeats.SAT}>
        
                        </Switch>
                </View>

                <TouchableOpacity onPress={
                    () => this.createEvent(this.state.title, 
                                        this.state.description, 
                                        this.state.startTime, 
                                        this.state.endTime, 
                                        this.state.color,
                                        this.state.date,
                                        this.state.repeats)
                                    }
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
    repeatSwitchContainer:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal:"25%",
        marginVertical:1
    },
    repeatText:{
        fontSize:20
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