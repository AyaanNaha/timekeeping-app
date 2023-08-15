import React, {Component} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { auth, database } from "../config";
import { child, onValue, set, update, ref } from "firebase/database";

export default class Create extends Component {
    constructor() {
        super();
        this.state = {
            title:"",
            description:"",
            startTime:"",
            endTime:"",
            color:"",
            repeats:"",
            date:"",
        }
    }

    componentDidMount() {
            
    }

    createEvent = (title, description, startTime, endTime, color, date, repeats) => {
        if (title == "" || description == "" || startTime == "" || date == "") {
            alert("Please fill all fields")
            return;
        }

        // Creating date object
        var dateSplit = date.split("/")
        var eventDate = new Date(dateSplit[2], dateSplit[0] - 1, dateSplit[1]).toDateString();
        
        var eventRepeats = false;
        if(repeats.length > 1) {
            eventRepeats = true;
        }

        if(eventRepeats) {
            this.createRepeatingEvent(title, description, startTime, endTime, color, eventDate, repeats)
        } else {
            this.createScheduledEvent(title, description, startTime, endTime, color, eventDate)
        }

        alert("Created Event")
    }

    createRepeatingEvent = (title, description, startTime, endTime, color, date, repeats) => {

        let eventData = []
        const eventRef = ref(database, `events/${auth.currentUser.uid}/`);
        onValue(eventRef, (snapshot) => {
            eventData = snapshot.val()
        })

    // if(dateRefIsNull) {
        var id;
        startTimeSplit = startTime.split(":");
        if (startTime.toUpperCase().includes("PM")) {
            id = parseInt(startTimeSplit[0]) - 1 + 12;
        } else {
            id = parseInt(startTimeSplit[0]) - 1
        }

        //ADD CODE TO CREATE THE EVENT JSON TO ADD INTO DATABASE


        let event = {
            id: id,
            info: {
                title: title,
                description: description,
                time: `${startTime}–${endTime}`,
                color:color,
                path: `events/${auth.currentUser.uid}/${eventData.length}/info/`,
                completed: false,
                date: date,
                repeats: repeats
            }
        }

        update(eventRef, {
            [eventData.length]: event
        })

        /** 
            var repeatingEventsRef = ref(database, `events/${auth.currentUser.uid}/repeatingEvents`);
            for(var i = 0; i < repeats.length; i++) {
                if(repeats[i]) {
                    //ENTER CODE FOR TO ADD THE EVENT INTO EACH DAY IT REPEATS HERE
                    let day = "";
                    switch(i) {
                        case 0: day = "SUN";
                        case 1: day = "MON";
                        case 2: day = "TUE";
                        case 3: day = "WED";
                        case 4: day = "THU";
                        case 5: day = "FRI";
                        case 6: day = "SAT";
                    }

                    if (day != "") {
                        let dayRef = child(repeatingEventsRef, `/${day}/`);
                        let dayArray = [];
                        onValue(dayRef, (snapshot) => {
                            dayArray = snapshot.val();
                            console.log(snapshot.val());
                        });
                        dayArray.push(event);
                        set(dayRef, dayArray)
                    }
                }
            }
            */

            
            
        // }
    }

    createScheduledEvent = (title, description, startTime, endTime, color, date) => {
        let eventData = []
        const eventRef = ref(database, `events/${auth.currentUser.uid}/`);
        onValue(eventRef, (snapshot) => {
            eventData = snapshot.val()
        })

    // if(dateRefIsNull) {
        var id;
        startTimeSplit = startTime.split(":");
        if (startTime.toUpperCase().includes("PM")) {
            id = parseInt(startTimeSplit[0]) - 1 + 12;
        } else {
            id = parseInt(startTimeSplit[0]) - 1
        }

        //ADD CODE TO CREATE THE EVENT JSON TO ADD INTO DATABASE

        let event = {
            id: id,
            info: {
                title: title,
                description: description,
                time: `${startTime}–${endTime}`,
                color:color,
                path: `events/${auth.currentUser.uid}/${eventData.length}/info/`,
                completed: false,
                date: date,
                repeats: "NONE"
            }
        }

        update(eventRef, {
            [eventData.length]: event
        })
        
    }

    toggleRepeatSwitch = (day) => {
        let repeatingDays = this.state.repeats
        if (repeatingDays.includes(day)) {
            repeatingDays = repeatingDays.replace(day + " ", "");
        } else {
            repeatingDays = repeatingDays.concat(`${day} `)
        }

        this.setState({repeats: repeatingDays})

        console.log(repeatingDays)
    }

    render() {
        return (
            <View style={styles.container}>
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
                    marginVertical:30,
                    width:"50%",
                    alignSelf:"center"
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

                <Text style={styles.repeatText}>Repeats:</Text>

                  <View style={styles.switches}>
                <View style={styles.repeatSwitchContainer}>
                    <Text style={styles.repeatText}>Sunday </Text>
                    <Switch
                        trackColor={{
                            false: "#767577",
                            true: "#00dd00"
                        }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {this.toggleRepeatSwitch("SUN")}}
                        value={this.state.repeats.includes("SUN")}>
        
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
                        onValueChange={() => {this.toggleRepeatSwitch("MON")}}
                        value={this.state.repeats.includes("MON")}>
        
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
                        onValueChange={() => {this.toggleRepeatSwitch("TUE")}}
                        value={this.state.repeats.includes("TUE")}>
        
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
                        onValueChange={() => {this.toggleRepeatSwitch("WED")}}
                        value={this.state.repeats.includes("WED")}>
        
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
                        onValueChange={() => {this.toggleRepeatSwitch("THU")}}
                        value={this.state.repeats.includes("THU")}>
        
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
                        onValueChange={() => {this.toggleRepeatSwitch("FRI")}}
                        value={this.state.repeats.includes("FRI")}>
        
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
                        onValueChange={() => {this.toggleRepeatSwitch("SAT")}}
                        value={this.state.repeats.includes("SAT")}>
        
                        </Switch>
                </View>
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
    switches:{
        flexDirection:"row",
        flexWrap:"wrap",
        alignContent:"center",
        justifyContent:"space-between",
    },
    repeatSwitchContainer:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal:"5%",
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
        borderRadius: 6,
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