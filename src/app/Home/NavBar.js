import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { HomeBaseComponent } from './HomeBaseComponent';
import { LocationsScreen } from './LocationsScreen';

export const navBar = StackNavigator({
  Locations: { 
  	screen: LocationsScreen,
  	navigationOptions: { title: 'Locations' }
  },
  Restaurant: {
    screen: ({props, navigation}) => <HomeBaseComponent {...props} firstPage = {"/restaurants?locationid=" + navigation.state.params.item.id }/>,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.item.name}`,
    }),
  },
});