import {View, Text} from 'react-native';
import React from 'react';
import Navigation from './common/Navigation';
import {Provider} from 'react-redux';
import {store} from './store';
import {io} from 'socket.io-client';
const socket = io('http://localhost:3000');
export default function App() {
  return (
    <Provider store={store}>
      <Navigation socket={socket} />
    </Provider>
  );
}
