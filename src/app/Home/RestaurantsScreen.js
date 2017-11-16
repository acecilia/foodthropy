import React from "react";
import { HomeBaseComponent } from "./HomeBaseComponent";

// Favourite button related
import { View, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { BouncingButton } from "./BouncingButton";
import FavouriteStorage from "./FavouriteStorage";

export class RestaurantsScreen extends HomeBaseComponent {
  makeRemoteRequest = async (id, isFavourite) => {
    // Start request
    url = global.baseUrl + "/restaurants/" + id;

    return fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        like: isFavourite
      })
    }).then(res => {
      if (res.status != 200) {
        var error = new Error(res.status);
        error.response = res;
        return Promise.reject(error);
      } else {
        return Promise.resolve(res);
      }
    });
  };

  renderRightIcon = item => {
    return (
      <View
        style={{
          flex: 1,
          flexGrow: 0.1,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <BouncingButton
          getinitialIsSelected={FavouriteStorage.getValueForId(item.id)}
          buttonPressed={button => {
            const isSelected = !button.state.isSelected;
            button.setSelectionState(isSelected);

            this.makeRemoteRequest(item.id, isSelected)
              .then(res => {
                // Like was added to the server
                FavouriteStorage.storeId(item.id, isSelected);
              })
              .catch(error => {
                Alert.alert(
                  "Ups! Something went wrong and we could not receive your like!",
                  "Some tips: check that you have internet connection, or try later ;P"
                );
                button.setSelectionState(!isSelected);
              });
          }}
        />
      </View>
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
