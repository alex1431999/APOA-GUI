import React from 'react';
import ReactNotification from 'react-notifications-component'

import 'react-notifications-component/dist/theme.css'
import './App.css'

import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <ReactNotification/>
      <Header/>
    </div>
  );
}

export default App;
