
import React from 'react';
import { HomeBaseComponent } from './HomeBaseComponent';
// For renderItem
import { View, TouchableOpacity } from "react-native";
import { ListItem, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';

export class RestaurantsScreen extends HomeBaseComponent {

	renderRightIcon = () => {
		return <View
			style= {{
				backgroundColor: 'skyblue',
				flex: 1, 
				flexGrow: 0,
	    	flexDirection: 'row', 
	    	justifyContent: 'flex-end',
	    	alignItems: 'center'
			}}
		>
			<Icon 
		    name = "md-heart" 
		    size = { 30 } 
		    color = "red"
  		/>
  	</View>
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
	        badge = {{ value: 3, textStyle: { color: 'white' }, containerStyle: { 
	        	backgroundColor: 'deepskyblue', 
	        },
	        style: { flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }

	      }}
	        // avatar = { require('../images/avatar1.jpg') }
	      />
      )}
    />
  }
}