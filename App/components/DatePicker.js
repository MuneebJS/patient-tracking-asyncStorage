import React, { Component } from 'react'
import {Text, View} from 'react-native'
import DatePicker from 'react-native-datepicker'


export default class AndrDatePicker extends Component {
    // constructor(props){
    //   super(props)

    //   this.state = {date:''}
    // }
   
    render(){
      return (
          <View>
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
          onDateChange={(date) => this.props.onDateChange(date)}
        />
        </View>
      )
    }
  }