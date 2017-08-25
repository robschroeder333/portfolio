import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <h1>Snake</h1>
    <h3>Use arrow keys to play (click window first)</h3>
    <iframe id="snakeFrame" src="snake.html" width="600" height="600"  frameBorder="0" />
  </div>
)
