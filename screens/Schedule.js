import React, {Component} from "react";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import EventCard from "./EventCard";

const DATA = [
    {
        title:"Do homework",
        time:"1:00 PM - 2:00 PM",
        description:"Finish homework for school",
        id: 0
    },
    {
        title:"Do dishes",
        time:"2:00 PM - 3:00 PM",
        description:"put in dishwasher",
        id: 1
    },
    {
        title:"sleep",
        time:"3:00 PM - 4:00 PM",
        description:"naptime",
        id: 2
    },
    {},{},{},{},{},{},{},{},{},{},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {        
    title:"sleep more",
    time:"3:00 PM - 4:00 PM",
    description:"naptime",
    id: 21},
    {},
    {},
    {},
]

export default class Schedule extends Component {
    constructor() {
        super();
        this.state= {
            data: []
        }
    }

    componentDidMount() {
        for (var i = 0; i < 24; i++) {
            if(i < 8 || i > 18) {
                this.state.data.push({id: i, info:{}})
            } else {
                this.state.data.push({
                    id: i, 
                    info: {
                        title: "Coding Class", 
                        time: i + 1 + ":00 - " + (i+2) + ":00", 
                        description: "Learn coding yayaya", 
                        color:"magenta"
                    }
                });
            }
        }
    }

    renderItem = ({item: event}) => {
        if(!event.info.title) {
            console.log("nuttn in event.info")
            return (
                <View style={styles.cardContainer}>
                    <Text style={styles.time}>{event.id + 1 > 12 ? event.id + 1 - 12 + " PM" : event.id + 1 + " AM"}</Text>
                    <View style={[styles.card, {paddingVertical:25}]}></View>
                </View>
            )
        } else {
            return (
                <View style={styles.cardContainer}>
                    <Text style={styles.time}>{event.id + 1 > 12 ? event.id + 1 - 12 + " PM" : event.id + 1 + " AM"}</Text>
                    <View style={styles.card}>
                    <EventCard event={event} navigation={this.props.navigation}></EventCard>
                    </View>
                </View>
            )
        }
    }

    keyExtractor = (item, index) => index.toString();
    

    render() {
        return (
            <View>
                <Text style={{fontSize:25}}>Schedule Screen</Text>

                
                {/* <ScrollView/> */}
                    <FlatList 
                     data={this.state.data}
                     renderItem={this.renderItem}
                     keyExtractor={this.keyExtractor}
                    />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-end",
        marginRight:10
    },
    card:{    
        borderWidth:2,
        borderColor:"black",
        borderTopWidth:1,
        borderBottomWidth:1,
        width:"85%",
        padding:10,
        
    },
    time:{marginTop:-8, marginRight:5}
})