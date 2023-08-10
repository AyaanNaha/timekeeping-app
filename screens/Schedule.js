import React, {Component} from "react";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import EventCard from "./EventCard";
import { ref, onValue, set, update } from "firebase/database";
import { auth, database } from "../config";
import { TouchableOpacity } from "react-native-gesture-handler";

/**
 * console.log("switched to schedule")
            this.setState({isLoading: true})
            this.fetchEvents();
            this.setState({isLoading: false});
 */

export default class Schedule extends Component {
    constructor() {
        super();
        this.state= {
            data: [],
            isLoading:true,
            isFocused: false
        }
    }

    componentDidUpdate() {
        if (this.state.isFocused !== this.props.isFocused) {
            

            // console.log("navigated to schedule")
            // this.fetchEvents();
            
            // this.setState({isFocused: this.props.isFocused})
          // Use the `this.props.isFocused` boolean
          // Call any action
        //   if(!this.state.isLoading) {
        //     this.setState({isLoading: true})
        //   }
        }
      }

      

    componentDidMount() {
        /*
        for (var i = 0; i < 24; i++) {
                this.state.data.push({id: i, info:[]})
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
        */

        // this.fetchEvents();

        // console.log("ScheduleScreenProps=" + this.props.navigation);
        // console.log(this.props)

        this.fetchEvents();
        this.setState({isLoading: false});
    }

    fetchEvents = () => {
        eventData = [];

        const eventRef = ref(database, `events/${auth.currentUser.uid}`);
        onValue(eventRef, (snapshot) => {
            // console.log(snapshot.val())
            eventData = snapshot.val();
        })

        // console.log("event Data = " + eventData)
        let date = new Date().toDateString();
        let day = date.slice(0,2).toUpperCase();

        let tempData = this.createEmptyEventsList();

        eventData.forEach((event) => {
            
            if(event.info.date == date) {
                tempData[event.id].info.push(event.info)
            }

            if(event.info.repeats) {
                if(event.info.repeats.includes(day)) {
                    tempData[event.id].info.push(event.info)
                }
            }
            
        })

        this.setState({data: tempData});

        // console.log(this.state.data[9])
    }

    createEmptyEventsList = () => {
        let eventData = []

        for (var i = 0; i < 24; i++) {
            eventData.push({id: i, info:[]});
        }

        return eventData;

        // console.log(eventInfo);

        // this.setState({data: eventInfo});

        // console.log(this.state.data)

        // const eventRef = ref(database, 'events/' + auth.currentUser.uid)
        // update(eventRef, {
        //     [date]: eventInfo
        // });

        // update(userRef, {
        //     lastLoginAt: date
        // });
    }

    renderItem = ({item: event}) => {
        // console.log(event);
        let time;
        if(event.id + 1 > 12) {
            event.id + 1 == 24 ? 
                time = (event.id + 1 - 12) + " AM" : 
                time = (event.id + 1 - 12) + " PM" 
        } else {
            event.id + 1 == 12 ? 
                time = (event.id + 1) + " PM" : 
                time = (event.id + 1) + " AM" 
        }

        // console.log(this.state.data)

        // console.log(event);
        

        if(!event.info[0]) {
            return (
                <View style={styles.cardContainer}>
                    <Text style={styles.time}>{time}</Text>
                    <View style={[styles.card, {paddingVertical:25}]}></View>
                </View>
            )
        } else {
            // console.log(event)
            return (
                <View style={styles.cardContainer}>
                    <Text style={styles.time}>{time}</Text>
                    <View style={styles.card}> 
                        <EventCard event={event.info} navigation={this.props.navigation}></EventCard>
                    </View>
                </View>
            )
        }
    }

    keyExtractor = (item, index) => index.toString();
    

    render() {
        

        if(this.state.isLoading) {
            this.fetchEvents();
            this.setState({isLoading: false});

            return (
            <View>
                <Text style={{fontSize:25}}>Loading...</Text>
            </View>
            )
        } else {

            return (
                <View style={styles.container}>
                    <Text style={{fontSize:25}}>Schedule Screen</Text>
                    <TouchableOpacity onPress={() => this.fetchEvents()}>
                        <Text>Reload</Text>
                    </TouchableOpacity>

                    
                    {/* <ScrollView/> */}
                        <FlatList 
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        style={styles.list}
                        />

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        
    },
    list:{
       paddingVertical:10
    },
    cardContainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-end",
        marginRight:10,
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