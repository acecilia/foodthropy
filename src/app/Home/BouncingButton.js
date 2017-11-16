import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export class BouncingButton extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isSelected: false
		};

		this.props.getinitialIsSelected.then(isSelected => {
			this.setState({
				isSelected: isSelected
			});
		});
	}

	setSelectionState = isSelected => {
		this.setState({
			isSelected: isSelected
		});
	};

	render() {
		return (
			<TouchableOpacity onPress={ () => {this.props.buttonPressed(this)}}>
				<Icon
					name={
						this.state.isSelected ? "md-heart" : "md-heart-outline"
					}
					size={40}
					color="red"
				/>
			</TouchableOpacity>
		);
	}
}
