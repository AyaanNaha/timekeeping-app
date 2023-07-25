import React, {Component} from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

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

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        let info = this.props.route.params;

        return (
        <View style={styles.container}>
            <View style={[styles.boundaryBox, {backgroundColor:lightColors[info.color]}]}>
                <View style={[styles.titleBox, {backgroundColor:colors[info.color]}]}>
                    <Text style={styles.title}>{info.title}</Text>
                    <Text style={styles.time}>{info.time}</Text>
                </View>

                <View style={styles.switchContainer}>
                    <Switch></Switch>
                    <Text>Mark As Complete</Text>
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
        width:"95%",
        justifyContent:"center",

    },
    switchContainer:{
        flexDirection:"row"
    },
    boundaryBox:{
        // opacity:0.5,
        borderRadius:10,
        // padding:10,
        backgroundColor:'rgb(255,150,150)',
        
    },
    titleBox: {
        // opacity:1,
        flexDirection:"row",
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        padding:8,
        alignItems:'center',
        backgroundColor:"cyan",
        justifyContent:'space-between'
    },
    title:{
        fontWeight:"bold",
        fontSize:16
    },
    time:{
        fontWeight:"300",
        fontSize:16,
        textAlign:"right",
    },
    description:{
        padding:12
    }
});
