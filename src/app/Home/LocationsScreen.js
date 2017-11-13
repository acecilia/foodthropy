
import React from 'react';
import { HomeBaseComponent } from './HomeBaseComponent';
// For renderItem
import { TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";

export class LocationsScreen extends HomeBaseComponent {
  render() {
    return <HomeBaseComponent 
      {...this.props} 
      firstPage = "/locations" 
      renderItem = { ({item}) => (
        <TouchableOpacity onPress = { () => this.props.onPressItem(item) }>
          <ListItem
            //roundAvatar
            title = { item.name }
            //subtitle = { item.name }
            //avatar = {{ uri: item.picture.thumbnail }}
            containerStyle = {{ borderBottomWidth: 0 }}
            badge = {{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: 0 } }}
            // avatar = { require('../images/avatar1.jpg') }
          />
        </TouchableOpacity>
      )}
    />
  }
}