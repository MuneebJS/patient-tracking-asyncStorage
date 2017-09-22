import React, { Component } from 'react';
import { Text, View, TextInput, Button, FlatList, AsyncStorage, ScrollView } from 'react-native';
import styles from '../style'
import DatePicker from 'react-native-datepicker'





export default class ShowPatient extends React.Component {
    constructor() {
        super();
        this.showData = this.showData.bind(this);
        this.searchByName = this.searchByName.bind(this);
        this.searchByDate = this.searchByDate.bind(this);
        this.state = {
            normalStatus: true,
            filterStatus: false,
            data: [],
            filterData: [],
            searchedVal: ''

        }
    }

    searchByName(text) {
        var arrayToPushedData = this.state.data;
        // console.log('arrary to pushed', arrayToPushedData);
        this.setState({ searchedVal: text })
        // console.log('name', arrayToPushedData[0].patient.name);
        var arrayToPushedData = arrayToPushedData.filter(asset => asset.patient.name.toLowerCase().indexOf(text) !== -1);
        console.log('arrary to pushed', arrayToPushedData);
        
        if (text == '') {
            this.setState({
                normalStatus: true,
                filterStatus: false
            })

        }
        else {
            this.setState({
                filterStatus: true,
                normalStatus: false,
                filterData: arrayToPushedData,
                date: ''
            })
        }
    }

    searchByDate(date) {
        this.setState({
            date: date
        })
        var arrayToPushedData = this.state.data;
        this.setState({ date: date })
        var arrayToPushedData = arrayToPushedData.filter(asset => asset.patient.date.indexOf(date) !== -1);

        if (date == '') {
            this.setState({
                normalStatus: true,
                filterStatus: false
            })

        }
        else {
            this.setState({
                filterStatus: true,
                normalStatus: false,
                filterData: arrayToPushedData
            })
        }        
    }
async showData() {
        // empty array where we push received data
        console.log('show data')
        var arrayToPushedData = [];
        try {
            const value = await AsyncStorage.getItem('Patients');
            if (value !== null) {
                // We have data!!
                parsedVal = JSON.parse(value);
                console.log ('if run', parsedVal);
                arrayToPushedData = parsedVal;
                this.setState({
                    data: arrayToPushedData
                })
            }
            else {
                console.log('else run')
            }
        } catch (error) {
            // Error retrieving data
            console.log('error get item', error);
        }
    }

    static navigationOptions = {
        title: 'Your Patients',
    };

    componentDidMount() {
        console.log('cdm')
        this.showData();
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TextInput multiline={true}
                    style={{ height: 40, borderColor: '#eee', borderWidth: 0, }}
                    onChangeText={(text) => this.searchByName(text.toLowerCase())}
                    placeholder="Search"
                /> 
    
                <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="D/M/YYYY"
        minDate="1/5/2016"
        maxDate="1/5/2018"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys. 
        }}
        onDateChange={(date) => this.searchByDate(date)}
      />

                {this.state.normalStatus &&
                 <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) =>
                        < View style={styles.margin20} key={index}>
                            <Text >Name:  {item.patient.name} </Text>
                            <Text>Date: {item.patient.date}</Text>
                            <Text>Desease: {item.patient.desease}</Text>
                            <Text>Sencivity Level: {item.patient.senLevel}</Text>
                            <Text>Description: {item.patient.description}</Text>
                        </View>
                    }
                />
                }

                {this.state.filterStatus && <FlatList
                    data={this.state.filterData}
                    renderItem={({ item }) =>
                        < View style={styles.margin20} >
                            <Text >Name:  {item.patient.name} </Text>
                            <Text>Date: {item.patient.date}</Text>
                            <Text>Desease: {item.patient.desease}</Text>
                            <Text>Sencivity Level: {item.patient.senLevel}</Text>
                            <Text>Description: {item.patient.description}</Text>
                        </View>
                    }
                />}
            </ScrollView>
        )
    }
}
