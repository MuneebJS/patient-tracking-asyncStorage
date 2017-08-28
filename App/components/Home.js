
import React, {Component} from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import styles from '../style'
import { StackNavigator } from 'react-navigation';
import renderIf from './renderIf'
// import image1 from './images'
// const image1 = require('../images/image1.jpg'),

export default class Home extends React.Component {
    constructor() {
        super();
        this.state ={
            status: false
        }
    }
    static navigationOptions = {
      title: 'Home',
    };
    show_hide() {
        this.setState({
            status: !this.state.status
        })
    }
    render() {
// const { navigate } = this.props.navigation 
// const { navigate } = this.props.navigation;


        return(
            <View style={[styles.container]}>
            <Text>Welcome to Patient Tracking App</Text>
            <Button style={styles.buttonStyle}  title="Add Patient" onPress={this.props.addPatNav} />
            <Button style={styles.buttonStyle}  title="See Patients" onPress={this.props.showPatNav} />
        </View>
        ) 
    }
}