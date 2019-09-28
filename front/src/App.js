import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import BasicLayout from './layouts/Basic/BasicLayout';
import reducer from './Reducers';
import { BrowserRouter as Router } from "react-router-dom";

export default class App extends Component {
  render() {
    const store = createStore(reducer);
    const unsubscribe = store.subscribe(() => console.log(store.getState()))
    return (
      <Provider store={store}>
        <Router>
          <BasicLayout />
        </Router>
      </Provider>
    );
  }
}