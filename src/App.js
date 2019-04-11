import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UploadImage from './Components/UploadImage';

class App extends Component {
  render() {
    return (
      <div >
        <UploadImage />
      </div>
    );
  }
}

export default App;
