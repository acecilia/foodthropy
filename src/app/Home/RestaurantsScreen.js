
import React from 'react';
import { HomeBaseComponent } from './HomeBaseComponent';
// For renderItem
import { TouchableOpacity } from "react-native";
import { ListItem, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';

export class RestaurantsScreen extends HomeBaseComponent {

	renderRightIcon = () => {
    return <Icon name = "md-heart" size = {30} color = "red" />
  }

  render() {
    return <HomeBaseComponent 
      {...this.props} 
      firstPage = { "/restaurants?locationid=" + this.props.locationId }
      renderItem = { ({item}) => (
	      <ListItem
	        //roundAvatar
	        title = { item.name }
	        subtitle = { item.name }
	        rightIcon = { this.renderRightIcon() }
	        onPressRightIcon = { this.renderLikeButton }
	        containerStyle = {{ borderBottomWidth: 0 }}
	        badge = {{ value: 3, textStyle: { color: 'white' }, containerStyle: { backgroundColor: 'deepskyblue', marginTop: 0 } }}
	        // avatar = { require('../images/avatar1.jpg') }
	      />
      )}
    />
  }
}