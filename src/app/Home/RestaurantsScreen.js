import React from "react";
import { HomeBaseComponent } from "./HomeBaseComponent";

// Favourite button related
import { View, Alert } from "react-native";
import { ListItem, Badge } from "react-native-elements";
import { BouncingButton } from "./BouncingButton";
import { RestaurantCellRightComponent } from "./RestaurantCellRightComponent";

import FavouriteStorage from "./FavouriteStorage";


export class RestaurantsScreen extends HomeBaseComponent {
  render() {
    return (
      <HomeBaseComponent
        {...this.props}
        urlRoot={"/restaurants"}
        urlQuery={{locationid: this.props.locationId}}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            rightIcon={<RestaurantCellRightComponent item= {item}/>}
            containerStyle={{ borderBottomWidth: 0 }}
          />
        )}
      />
    );
  }
}
