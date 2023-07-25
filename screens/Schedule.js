import React, {Component} from "react";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import EventCard from "./EventCard";


export default class Schedule extends Component {
    constructor() {
        super();
        this.state= {
            data: []
        }
    }

    componentDidMount() {
        for (var i = 0; i < 24; i++) {
            // if(i < 8 || i > 18) {
                this.state.data.push({id: i, info:[]})
            // } else {
            //     this.state.data.push({
            //         id: i, 
            //         info: {
            //             title: "Coding Class", 
            //             time: i + 1 + ":00 - " + (i+2) + ":00", 
            //             description: "Learn coding yayaya", 
            //             color:"magenta"
            //         }
            //     });
            // }
        }

        this.state.data[12].info = [{
            title:"Coding class",
            time: "1:00-1:30",
            description: "Learn codeing at byjus future school its great for you trust",
            color:"red"
        },{
            title:"Relax class",
            time: "1:30-2:00",
            description: "sleepy sleepy",
            color:"cyan"
        }]

    }

    renderItem = ({item: event}) => {
        if(!event.info[0]) {
            return (
                <View style={styles.cardContainer}>
                    <Text style={styles.time}>{event.id + 1 > 12 ? event.id + 1 - 12 + " PM" : event.id + 1 + " AM"}</Text>
                    <View style={[styles.card, {paddingVertical:25}]}></View>
                </View>
            )
        } else {
            console.log(event)
            return (
                <View style={styles.cardContainer}>
                    <Text style={styles.time}>{event.id + 1 > 12 ? event.id + 1 - 12 + " PM" : event.id + 1 + " AM"}</Text>
                    <View style={styles.card}> 
                        <EventCard event={event.info} navigation={this.props.navigation}></EventCard>
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