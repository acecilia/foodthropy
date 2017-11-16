import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export class BouncingButton extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isSelected: false
    }

		this.props.getinitialIsSelected.then( (isSelected) => {
			this.setState({
	    	isSelected: isSelected
	  	})
		})
  }

  changeSelectedState = () => {
		this.setState({
    	isSelected: !this.state.isSelected
  	}, () => {
  		this.props.onSelectionChange(this.state.isSelected)
  	})
	}

  render() {
  	return (
  		<TouchableOpacity 
  		onPress = { this.changeSelectedState }
  		>
	  		<View
					style = {{
						flex: 1, 
						flexGrow: 0,
			    	flexDirection: 'row', 
			    	justifyContent: 'flex-end',
			    	alignItems: 'center'
					}}
				>
					<Icon 
				    name =  { this.state.isSelected ? "md-heart" : "md-heart-outline" }
				    size = { 40 } 
				    color = "red"
		  		/>
		  	</View>
	  	</TouchableOpacity>
  	)
  }
}
