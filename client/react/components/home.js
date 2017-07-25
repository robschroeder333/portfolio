import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';


export default ({match}) => (
  <div>
    <h1><Link to="/about">About</Link></h1>
    <h1><Link to="/contact">Contact</Link></h1>
    <h1><Link to="/projects">Projects</Link></h1>
  </div>
);
