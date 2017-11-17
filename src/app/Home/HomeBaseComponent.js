import React, { PureComponent } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, SearchBar } from "react-native-elements";
import _ from "lodash";
import QueryString from "query-string";

export class HomeBaseComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      refreshing: true
    };

    this.logic = {
      error: null,
      loading: false,
      next: "",
      urlRoot: this.props.urlRoot,
      urlQuery: this.props.urlQuery === undefined ? {} : this.props.urlQuery,
      searchText: ""
    };
  }

  componentDidMount() {}

  makeRemoteRequest = nameFilter => {
    // Preconditions
    if (this.logic.loading === true) {
      return;
    }
    if (this.state.refreshing === true) {
      const query = { ...this.logic.urlQuery };
      if (this.logic.searchText.length > 0) {
        query.nameFilter = this.logic.searchText;
      }
      const queryString = ""
      if (Object.keys(query).length > 0) {
        queryString = "?" + QueryString.stringify(query)
      }
      this.logic.next = this.logic.urlRoot + queryString;
    }
    if (this.logic.next === null) {
      return;
    }

    // Start request
    this.logic.loading = true;
    url = global.baseUrl + this.logic.next;
    console.log("Request started: " + url);

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log("Request arrived: " + url);

        this.logic.next = res.meta.paginator.links.next;
        this.logic.error = res.error || null;
        this.logic.loading = false;

        this.setState({
          data:
            res.meta.paginator.currentPage === 1
              ? res.data
              : [...this.state.data, ...res.data],
          refreshing: false
        });
      })
      .catch(error => {
        this.logic.error = error;
        this.logic.loading = false;
        this.state.refreshing = false;

        this.forceUpdate();
      });
  };

  handleRefresh = nameFilter => {
    this.setState({ refreshing: true }, () => {
      this.makeRemoteRequest(nameFilter);
    });
  };

  handleLoadMore = () => {
    this.makeRemoteRequest();
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
          marginLeft: "5%"
        }}
      />
    );
  };

  handleRefreshDebounced = _.debounce(() => {
    this.handleRefresh(this.logic.searchText);
  }, 300);

  onchangeText = text => {
    this.logic.searchText = text;
    this.handleRefreshDebounced();
  };

  renderSearchBar = () => {
    return (
      <SearchBar
        backgroundColor="transparent"
        inputStyle={{ color: "white" }}
        placeholderStyle={{ borderWidth: 1, backgroundColor: "#fff" }}
        placeholder="Search"
        clearIcon={{ name: "clear" }}
        onChangeText={this.onchangeText}
      />
    );
  };

  loadingView = (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 100
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );

  renderTextView = text => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 100
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "gray",
            textAlign: "center"
          }}
        >
          {text}
        </Text>
      </View>
    );
  };

  errorView = this.renderTextView("Uh, an error occurred :(");
  emptyView = this.renderTextView("Ooops, the list is empty!");

  renderFooter = () => {
    if (this.logic.next === null) {
      if (this.state.data.length === 0) {
        return this.emptyView;
      } else {
        return null;
      }
    }

    if (this.logic.error && this.state.data.length === 0) {
      return this.errorView;
    }

    return this.loadingView;
  };

  render() {
    console.log("Render");

    return (
      <FlatList
        style={{ backgroundColor: "white" }}
        data={this.state.data}
        renderItem={this.props.renderItem}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderSearchBar}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={false}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0} // Usually user will use the search bar, not scroll. We just need some data to fill the view
      />
    );
  }
}
