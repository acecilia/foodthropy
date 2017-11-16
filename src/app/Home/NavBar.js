import React from "react";
import { AppRegistry } from "react-native";
import { StackNavigator } from "react-navigation";

import { LocationsScreen } from "./LocationsScreen";
import { RestaurantsScreen } from "./RestaurantsScreen";

export const navBar = StackNavigator({
  Locations: {
    screen: ({ props, navigation }) => (
      <LocationsScreen
        {...props}
        onPressItem={item => navigation.navigate("Restaurant", { item: item })}
      />
    ),
    navigationOptions: {
      title: "Locations"
    }
  },

  Restaurant: {
    screen: ({ props, navigation }) => (
      <RestaurantsScreen
        {...props}
        locationId={navigation.state.params.item.id}
        onPressItem={() => {}}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.item.name}`
    })
  }
});
