import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import BasicLayout from './components/Basic/BasicLayout';
import reducer from './Redux/Reducers';

export default class App extends Component {
  render() {
    const store = createStore(reducer);
    const unsubscribe = store.subscribe(() => console.debug(store.getState()));
    unsubscribe();

    return (
      <Provider store={store}>
        <Router>
          <BasicLayout />
        </Router>
      </Provider>
    );
  }
}
