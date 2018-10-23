import React, { Component } from 'react';
import logo from './logo.svg';
import * as posenet from '@tensorflow-models/posenet';
import trumpImg from './trump.jpg';
import './App.css';

class App extends Component {
  async componentDidMount() {
    var canvas = document.getElementById('my-canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = trumpImg;
    img.onload = function() {
      canvas.setAttribute('width', `${img.width}`);
      canvas.setAttribute('height', `${img.height}`);
      ctx.drawImage(img, 0, 0, this.width, this.height, 0, 0, img.width, img.height);
        var imageScaleFactor = 0.5;
        var outputStride = 16;
        var flipHorizontal = false;
        posenet.load().then(function(net){
          return net.estimateSinglePose(img, imageScaleFactor, flipHorizontal, outputStride)
        }).then(function(pose){
          console.log(pose);
          pose.keypoints.forEach(function(keypoint) {
            ctx.beginPath();
            ctx.fillStyle = 'rgb(255, 255, 89)';
            ctx.fillText(keypoint.part, keypoint.position.x + 10, keypoint.position.y);
            ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgb(155, 187, 89)';
            ctx.fill();
          });
        });
    };
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
        <div id="canvas-wrapper">
            <canvas id="my-canvas"></canvas>
        </div>
      </div>
    );
  }
}

export default App;
