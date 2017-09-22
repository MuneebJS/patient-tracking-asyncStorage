import React, { Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet, FlatList, Picker, AsyncStorage, ScrollView } from 'react-native';
import styles from '../style'




export default class AddPatient extends React.Component {
    constructor() {
        super();
        this.state = {
            nameText: '',
            nameDesease: '',
            gender: 'male',
            senLevel: 'normal',
            description: 'n/a',
            setData: []
        };
        this.watchGender = this.watchGender.bind(this);
        this.watchGender = this.watchLevel.bind(this);
        this.setItem = this.setItem.bind(this);
    }

    static navigationOptions = {
        title: 'Add Patient',
    };

    addData() {
        let date = new Date();
        console.log(date)
        let today = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let fullDate = today + '/' + month + '/' + year;
        // console.log(today, month, year, fullDate);
        let patientData = {
            patient: {
                name: this.state.nameText,
                date: fullDate,
                desease: this.state.nameDesease,
                gender: this.state.gender,
                senLevel: this.state.senLevel,
                description: this.state.description,
                // setData: []
            }
        }

        this.setItem(patientData);

    }
    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem('Patients');
            if (value !== null) {
                // We have data!!
                parsedVal = JSON.parse(value);
                // console.log(parsedVal);
                this.setState({
                    setData: parsedVal
                })
            }
        } catch (error) {
            // Error retrieving data
            console.log('error get item', error);
        }        
    }

    async setItem(obj) {
    console.log('set item run', obj)
        arrayToPushedData = this.state.setData;
        arrayToPushedData.push(obj);

        try {
            await AsyncStorage.setItem('Patients', JSON.stringify(arrayToPushedData));
            console.log('arraytopusheddate from set item', arrayToPushedData);

        }
        catch (error) {
            // Error saving data
            console.log('error in setItem', error)
        }
    }

    async consoleDate() {
        try {
            const value = await AsyncStorage.getItem('Patients');
            if (value !== null) {
                // We have data!!
                parsedVal = JSON.parse(value);
                console.log(parsedVal);
            }
        } catch (error) {
            // Error retrieving data
            console.log('error get item', error);
        }
    }

    watchGender = (gender) => {
        this.setState({ gender: gender })
    }
    watchLevel = (level) => {
        this.setState({ senLevel: level })
    }

    render() {
        return (
            <ScrollView style={styles.container} >
                <Text style={styles.margin20}>Patient Name</Text>
                <TextInput
                    style={{ height: 40, borderColor: '#eee', borderWidth: 0, }}
                    onChangeText={(text) => this.setState({ nameText: text })}
                    placeholder="Name"
                />

                <Text style={styles.margin20}>Name of Desease</Text>
                <TextInput
                    style={{ height: 40, borderColor: '#eee', borderWidth: 0, }}
                    onChangeText={(text) => this.setState({ nameDesease: text })}
                    placeholder="Desease"
                />
                <Text style={styles.margin10}>Gender</Text>
                <Picker style={{}} selectedValue={this.state.gender} onValueChange={(item) => this.watchGender(item)}>
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                </Picker>

                <Text style={styles.margin10}>Level of sensitivity</Text>
                <Picker style={{}} selectedValue={this.state.senLevel} onValueChange={(item) => this.watchLevel(item)}>
                    <Picker.Item label="Normal" value="normal" />
                    <Picker.Item label="High" value="high" />
                    <Picker.Item label="Low" value="low" />
                </Picker>
                <Text style={styles.margin20}>Description</Text>
                <TextInput multiline={true}
                    style={{ height: 40, borderColor: '#eee', borderWidth: 0, }}
                    onChangeText={(text) => this.setState({ description: text })}
                    placeholder="Desease"
                />
                <Button title="Add" style={{
                    flex: 1
                }} onPress={this.addData.bind(this)} />
                {/* <Button style={{
                    flex: 1
                }} title="Show" onPress={this.consoleDate.bind(this)} /> */}
            </ScrollView>
        )
    }
}
