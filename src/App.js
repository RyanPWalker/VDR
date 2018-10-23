import React, { Component } from 'react';
import logo from './logo.svg';
import * as posenet from '@tensorflow-models/posenet';
import trumpImg from './trump.jpg';
import './App.css';

class App extends Component {
  async componentDidMount() {
    const scaleFactor = 0.50;
    const flipHorizontal = false;
    const outputStride = 16;
    const imageElement = document.getElementById('trump');
    // load the posenet model
    const net = await posenet.load();
    const pose = await net.estimateSinglePose(imageElement, scaleFactor, flipHorizontal, outputStride);
    console.log('pose', pose); // spits out array of joint positions
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="ryanwalker.party"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn to Party
          </a>
        </header>
        <img id="trump" src={trumpImg} alt="trump" />
      </div>
    );
  }
}

export default App;
