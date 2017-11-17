import React from "react";

// Favourite button related
import { View, Alert } from "react-native";
import { ListItem, Badge } from "react-native-elements";
import { BouncingButton } from "./BouncingButton";
import FavouriteStorage from "./FavouriteStorage";

export class RestaurantCellRightComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item
    };
  }

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

  likePressed = (id, button) => {
    const isSelected = !button.state.isSelected;

    // Update the UI instantly
    button.setSelectionState(isSelected);

    // Sync with the server
    this.makeRemoteRequest(id, isSelected)
      .then(res => res.json())
      .then(item => {
        // Like was added to the server, now update local database
        FavouriteStorage.storeId(id, isSelected);

        // Update number of likes
        this.setState({
          item: item
        });
      })
      .catch(error => {
        Alert.alert(
          "Ups! Something went wrong and we could not receive your like!",
          "Some tips: check that you have internet connection, or try later ;P"
        );
        // Rollback UI update
        button.setSelectionState(!isSelected);
      });
  };

  render() {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginHorizontal: 10
        }}
      >
        <Badge
          value={this.state.item.likes}
          textStyle={{
            color: "white",
            fontSize: 17,
            fontWeight: "bold"
          }}
          containerStyle={{
            backgroundColor: "red",
            minWidth: 40
          }}
        />
        <BouncingButton
          style={{ marginLeft: 10 }}
          getinitialIsSelected={FavouriteStorage.getValueForId(
            this.state.item.id
          )}
          buttonPressed={button => {
            this.likePressed(this.state.item.id, button);
          }}
        />
      </View>
    );
  }
}
