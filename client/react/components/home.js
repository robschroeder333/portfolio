import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';


export default ({match}) => (
  <div>
    <h1>About</h1>
    <h1>Contact</h1>
    <h1><Link to="/projects">Projects</Link></h1>
  </div>
);
