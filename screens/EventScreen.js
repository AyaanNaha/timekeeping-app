import { ref, update } from "firebase/database";
import React, {Component} from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { auth, database } from "../config";
import { TouchableOpacity } from "react-native-gesture-handler";

const lightColors = {
    red:"rgba(255,0,0,0.5)",
    green:"rgba(0,255,0,0.5)",
    blue:"rgba(0,100,255,0.5)",
    yellow:"rgba(150,150,0,0.5)",
    cyan:"rgba(0,150,150,0.5)",
    magenta:"rgba(230,0,230,0.5)"
};

const colors = {
    red:"rgb(255,0,0)",
    green:"rgb(0,180,0)",
    blue:"rgb(0,100,255)",
    yellow:"rgb(150,150,0)",
    cyan:"rgb(0,230,230)",
    magenta:"rgb(230,0,230)"
};

export default class EventScreen extends Component {
    constructor() {
        super();
        this.state = {
            isEnabled: false
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.fetchCompletionStatus()
    }

    fetchCompletionStatus = () => {
        // const eventRef = ref(database, `events/${auth.currentUser.uid}/${new Date().toDateString()}`)
        this.setState({isEnabled: this.props.route.params.completed})
    }

    toggleSwitch = (path) => {
        this.setState({
            isEnabled: !this.state.isEnabled
        })

        const eventRef = ref(database, path);
        update(eventRef, {
            completed: !this.state.isEnabled
        }) .catch((error) => {
            alert(error.message);
            console.log("ERROR CODE: " + error.code + "\nERROR MESSAGE: " + error.message)
        })

        
       
    }

    render() {
        let info = this.props.route.params;

        return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {this.props.navigation.goBack({reloadRequired:true})}}>
                <Text>Go Back</Text>
            </TouchableOpacity>
            <View style={[styles.boundaryBox, {backgroundColor:lightColors[info.color]}]}>
                <View style={[styles.titleBox, {backgroundColor:colors[info.color]}]}>
                    <Text style={styles.title}>{info.title}</Text>
                    <Text style={styles.time}>{info.time}</Text>
                </View>

                <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>Mark As Complete</Text>
                    <Switch
                    trackColor={{
                        false: "#767577",
                        true: info.color
                      }}
                      thumbColor={"#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => this.toggleSwitch(info.path)}
                      value={this.state.isEnabled}></Switch>
                </View>
                <Text style={styles.description}>{info.description}</Text>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:5,
        justifyContent:"center",

    },
    switchContainer:{
        flexDirection:"row",
        alignSelf:"center",
        justifyContent:"center",
        marginVertical:20
    },
    switchText:{

        fontSize:24,
        marginRight:10
    },
    boundaryBox:{
        // opacity:0.5,
        borderRadius:10,
        // padding:10,
        backgroundColor:'rgb(255,150,150)',
        height:"95%",
        width:"95%",
        alignSelf:"center"
    },
    titleBox: {
        // opacity:1,
        flexDirection:"row",
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        padding:10,
        alignItems:'center',
        backgroundColor:"cyan",
        justifyContent:'space-between',
        paddingHorizontal:15
    },
    title:{
        fontWeight:"bold",
        fontSize:30
    },
    time:{
        fontWeight:"300",
        fontSize:25,
        textAlign:"right",
    },
    description:{
        padding:12,
        fontSize:20
    }
});
