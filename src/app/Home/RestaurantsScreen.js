import React from "react";
import { HomeBaseComponent } from "./HomeBaseComponent";

// Favourite button related
import { ListItem } from "react-native-elements";
import { BouncingButton } from "./BouncingButton";
import FavouriteStorage from "./FavouriteStorage";

export class RestaurantsScreen extends HomeBaseComponent {
	renderRightIcon = item => {
		return (
			<BouncingButton
				getinitialIsSelected={FavouriteStorage.getValueForId(item.id)}
				onSelectionChange={isSelected => {
					FavouriteStorage.storeId(item.id, isSelected);
				}}
			/>
		);
	};

	render() {
		return (
			<HomeBaseComponent
				{...this.props}
				firstPage={"/restaurants?locationid=" + this.props.locationId}
				renderItem={({ item }) => (
					<ListItem
						title={item.name}
						subtitle={item.id}
						rightIcon={this.renderRightIcon(item)}
						containerStyle={{ borderBottomWidth: 0 }}
					/>
				)}
			/>
		);
	}
}
