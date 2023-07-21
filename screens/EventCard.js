import React, {Component} from "react";
import { View, Text, StyleSheet } from "react-native";

export default class EventCard extends Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        // console.log(this.props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.event.title}</Text>
                <Text>{this.props.event.time}</Text>
                <Text>{this.props.event.description}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:280
    },
});
