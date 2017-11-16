
import React from 'react';
import { HomeBaseComponent } from './HomeBaseComponent';
// For renderItem
import { TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";

export class LocationsScreen extends HomeBaseComponent {
  render() {
    return <HomeBaseComponent 
      { ...this.props } 
      firstPage = "/locations" 
      renderItem = { ({item}) => (
        <TouchableOpacity onPress = { () => this.props.onPressItem(item) }>
          <ListItem
            title = { item.name }
            containerStyle = {{ borderBottomWidth: 0 }}
          />
        </TouchableOpacity>
      )}
    />
  }
}