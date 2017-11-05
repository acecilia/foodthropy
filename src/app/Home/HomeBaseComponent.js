import React, { PureComponent } from "react"
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native"
import { List, ListItem, SearchBar } from "react-native-elements"

export class HomeBaseComponent extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      refreshing: false
    }

    this.logic = {
    	error: null,
    	loading: false,
    	next: this.props.firstPage
    }
  }

  componentDidMount() { }

  makeRemoteRequest = () => {
  	// Preconditions
  	if (this.logic.loading === true) { return }
  	if (this.state.refreshing === true) { this.logic.next = this.props.firstPage }
  	if (this.logic.next === null) { return }

  	// Start request
  	this.logic.loading = true
    url = global.baseUrl + this.logic.next
    console.log("Request started: " + url)

    fetch(url)
    .then(res => res.json())
    .then(res => {
    	console.log("Request arrived: " + url)
    	
    	this.logic.next = res.meta.paginator.links.next
    	this.logic.error = res.error || null
    	this.logic.loading = false

      this.setState({
        data: res.meta.paginator.currentPage === 1 ? res.data : [...this.state.data, ...res.data],
        refreshing: false
      })
    })
    .catch(error => {
    	this.logic.error = error
    	this.logic.loading = false
    	this.state.refreshing = false

      this.forceUpdate()
    })
  }

  handleRefresh = () => {    
    this.setState({ refreshing: true }, () => {
    	this.makeRemoteRequest()
    })
  }

  handleLoadMore = () => {    
    this.makeRemoteRequest()
  }

  renderSeparator = () => {
    return (
	    <View style = {{ 
	    	height: 1, 
	    	width: "86%", 
	    	backgroundColor: "#CED0CE", marginLeft: "14%" 
	    }}/>
    )
  }

  renderSearchBar = () => {
    return <SearchBar placeholder = "Type Here..." lightTheme round />
  }

  renderLoading = () => {
    return (
	    <View style = {{ paddingVertical: 20 }}>
	        <ActivityIndicator animating size = "large"/>
	    </View>
    )
  }

  renderEmpty = () => {
  	return <Text>"Empty"</Text>
  }

  renderError = () => {
  		return <Text>Error</Text>
  }

  renderFooter = () => {
    if (this.logic.next === null) {
    	if (this.state.data.length === 0) {
      	return this.renderEmpty()
    	} else {
    		return null
    	}
    }

    if (this.logic.error && this.state.data.length === 0) {
  		return this.renderError()
  	}

    return this.renderLoading()
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress = { () => this.onPressItem(item) }>
      <ListItem
        //roundAvatar
        title = { item.name }
        subtitle = { item.name }
        //avatar = {{ uri: item.picture.thumbnail }}
        containerStyle = {{ borderBottomWidth: 0 }}
      />
    </TouchableOpacity>
  )

  onPressItem = (item) => {
     this.props.navigation.navigate('Restaurant', { item: item })
  }

  render() {
  	console.log("Render")

    return (
	    <FlatList style={{backgroundColor: 'white'}}
	      data = { this.state.data }
	      //extraData = { this.state }
	      renderItem = { this.renderItem }
	      keyExtractor = { item => item.name }
	      ItemSeparatorComponent = { this.renderSeparator }
	      ListHeaderComponent = { this.renderSearchBar }
	      ListFooterComponent = { this.renderFooter }
	      onRefresh = { this.handleRefresh }
	      refreshing = { this.state.refreshing }
	      onEndReached = { this.handleLoadMore }
	      onEndReachedThreshold = { 0 } // Usually user will use the search bar, not scroll. We just need some data to fill the view
	    />
    )
  }
}