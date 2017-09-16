import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './HomeScreen';

export const navBar = StackNavigator({
  Home: { 
  	screen: HomeScreen,
  	navigationOptions: { title: 'Welcome' }
  }
});