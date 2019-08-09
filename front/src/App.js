import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import BasicLayout from './layouts/Basic/BasicLayout';
import reducer from './Reducers';

export default class App extends Component {
  render() {
    const store = createStore(reducer);
    return (
      <Provider store={store}>
        <BasicLayout />
      </Provider>
    );
  }
}
