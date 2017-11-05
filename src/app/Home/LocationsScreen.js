
import React from 'react';
import { HomeBaseComponent } from './HomeBaseComponent';

export class LocationsScreen extends HomeBaseComponent {
  render() {
    return <HomeBaseComponent 
      {...this.props} 
      firstPage = "/locations" 
    />
  }
}