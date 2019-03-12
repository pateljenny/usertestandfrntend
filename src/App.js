import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../src/Service/store';
import Users from './User/user';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Users />
      </Provider>
    );
  }
}

export default App;
