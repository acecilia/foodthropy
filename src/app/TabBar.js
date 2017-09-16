import React from 'react';
import { AppRegistry } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { navBar } from './Home/NavBar';

const tabBar = TabNavigator({
    Home: { 
      screen: navBar,
      navigationOptions: { tabBarLabel: 'Home' },
      
    }
  },
  {
    tabBarPosition: 'bottom'
  }
);

AppRegistry.registerComponent('foodthropy', () => tabBar);