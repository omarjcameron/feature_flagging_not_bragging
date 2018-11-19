import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LDClient from 'ldclient-js';

const isNewer = (a, b) => Date.parse(a.added) < Date.parse(b.added)

class App extends Component {
  constructor() {
    super()
    this.state = {
      sortOrder: null,
      foods: [
        { name: 'Pepper Pot', added: '2018-10-13'},
        { name: 'Cacio e Pepe', added: '2018-10-23'},
        { name: 'Pizza', added: '2018-11-07'},
        { name: 'Shakshuka', added: '2018-12-31'},
        { name: 'Tacos al Pastor', added: '2018-12-14'},
      ]
    }
  }
  componentDidMount() {
    const user = {
      key: 'ojc'
    }
    this.ldclient = LDClient.initialize('5bee718af7527e4b8311e181', user)
    this.ldclient.on('ready', this.onLaunchDarklyReady.bind(this))
    this.ldclient.on('change', this.onLaunchDarklyReady.bind(this))
  }
  onLaunchDarklyReady() {
    this.setState({
      featureFlags: {
        defaultSortingIsAdded: this.ldclient.variation('food-favorites-primary-sorting-method')
      }
    })
  }

  render() {
    if (!this.state.featureFlags) {
        return <div className="App">Loading...</div>
    }

    let sorter
    if (this.state.selectedSortOrder) {
      if (this.state.selectedSortOrder === 'added') {
        sorter = isNewer;
      } else if (this.state.selectedSortOrder === 'basic') {
        sorter = undefined;
      }
    } else {
      if (this.state.featureFlags.defaultSortingIsAdded) {
        sorter = isNewer;
      } else {
        sorter = undefined;
      }
    }

    return (
      <div className="App">
        <div
          style={{ fontWeight: sorter === undefined ? 'bold' : 'normal'}}
          onClick={() => this.setState({ selectedSortOrder: 'basic' })}>
          Basic Sort
        </div>
        <div
          style={{ fontWeight: sorter === isNewer ? 'bold' : 'normal'}}
          onClick={() => this.setState({ selectedSortOrder: 'added'})}>
          Sort by date
        </div>
        <ul>
          {this.state.foods.slice().sort(sorter).map(food =>
              <li>{food.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
