import React, {Component} from 'react';
import { Text,
    View} from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen';
import SecondScreen from './Screens/SecondScreen';
import {
    StackNavigator,
  } from 'react-navigation';

const Navigation = StackNavigator({
    Welcome: {screen: SecondScreen},
    Second: {screen: SecondScreen}
})

export default Navigation;