import React, {Component} from "react";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import EventCard from "./EventCard";
import { ref, onValue, set, update } from "firebase/database";
import { auth, database } from "../config";



export default class Schedule extends Component {
    constructor() {
        super();
        this.state= {
            data: [],
            isLoading:true
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          // Call any action
          this.setState({isLoading: true})
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
    }


    fetchEvents = () => {
        var date = new Date().toDateString();
        var todaysRefIsNull = false;

        const userRef = ref(database, 'users/' + auth.currentUser.uid);

        const eventRef = ref(database, `events/${auth.currentUser.uid}/${date}/`);
         onValue(eventRef, (snapshot) => {
            if(snapshot.val() == null) {
                todaysRefIsNull = true;
            } else {
                // console.log(snapshot.val())

                let eventData = [];

                snapshot.val().forEach(element => {
                    if (element.info == undefined) {
                        eventData.push({id: element.id, info:[]})
                        // console.log("pushed " + element + " into data");
                    } else {
                        eventData.push(element)
                    }
                    
                });

                this.setState({data: eventData});
            }
        })

        // console.log(this.state.data)

        if (todaysRefIsNull) {
            this.createEmptyEventsList(userRef, date)
        }

        this.setState({isLoading: false})
    }

    createEmptyEventsList(userRef, date) {
        eventInfo = []
        for (var i = 0; i < 24; i++) {
            eventInfo.push({id: i, info:[]});
        }

        const eventRef = ref(database, 'events/' + auth.currentUser.uid)
        update(eventRef, {
            [date]: eventInfo
        });

        update(userRef, {
            lastLoginAt: date
        });
    }

    renderItem = ({item: event}) => {
        // console.log(event);
        

        if(!event.info[0]) {
            return (
                <View style={styles.cardContainer}>
                    <Text style={styles.time}>{event.id + 1 > 12 ? event.id + 1 - 12 + " PM" : event.id + 1 + " AM"}</Text>
                    <View style={[styles.card, {paddingVertical:25}]}></View>
                </View>
            )
        } else {
            // console.log(event)
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