
import React from 'react';
import { HomeBaseComponent } from './HomeBaseComponent';

export class RestaurantsScreen extends HomeBaseComponent {
  render() {
    return <HomeBaseComponent 
      {...this.props} 
      firstPage = { "/restaurants?locationid=" + this.props.locationId }
    />
  }
}