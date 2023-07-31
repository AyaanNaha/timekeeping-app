import React, {Component} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

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

export default class EventCard extends Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        console.log(this.props)
    }

    renderItem = ({item: info}) => {
        console.log(info.completed)
        if(info.completed) {
            return (
            <TouchableOpacity style={styles.container} onPress={
                () => this.props.navigation.navigate("EventScreen", info)}
                >
                    <View style={[styles.titleBox, {borderRadius:10}]}>
                        <Text style={[styles.title, {textDecorationLine:"line-through"}]}>{info.title}</Text>
                        <Text style={styles.time}>{info.time}</Text>
                    </View> 
                </TouchableOpacity>
                )
        
        } else{ 
            return (
        <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate("EventScreen", info)}>
            <View style={[styles.boundaryBox, {backgroundColor:lightColors[info.color]}]}>
                <View style={[styles.titleBox, {backgroundColor:colors[info.color]}]}>
                    <Text style={styles.title}>{info.title}</Text>
                    <Text style={styles.time}>{info.time}</Text>
                </View>
                <Text style={styles.description}>{info.description}</Text>
            </View>
        </TouchableOpacity>
        )
    }
    }

    keyExtractor = (item, index) => index.toString();

    render() {
        let info = this.props.event

        return (
            <FlatList 
            data={info}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
           />

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:5,
        width:280
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
        backgroundColor:"rgb(150,150,150)",
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
