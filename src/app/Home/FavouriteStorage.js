import React from "react";
import { AsyncStorage } from "react-native";

export default class FavouriteStorage {
	static keyPrefix = "@FavouriteStorage:";

	static storeId = async (id, value) => {
		try {
			await AsyncStorage.setItem(
				FavouriteStorage.keyPrefix + id,
				JSON.stringify(value)
			);
		} catch (error) {
			// Error saving data
		}
	};

	static getValueForId = async id => {
		try {
			const value = await AsyncStorage.getItem(FavouriteStorage.keyPrefix + id);
			if (value === "true") {
				return true;
			}
		} catch (error) {
			// Error retrieving data
		}

		return false;
	};
}
