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
            this.state.data.push({id: i, title: "title", time: i + 1 + " O clock", description: "description"});
        }
        console.log(this.state.data)
    }

    renderItem = ({item: event}) => {
        return (
            <View style={styles.cardContainer}>
                <Text>{event.id + 1 > 12 ? event.id + 1 - 12 + " PM" : event.id + 1 + " AM"}</Text>
                <View style={styles.card}>
                 <EventCard event={event} navigation={this.props.navigation}></EventCard>
                </View>
            </View>
        )
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
        marginLeft: 5,  
        borderWidth:2,
        borderColor:"black",
        padding: 10,
    }
})