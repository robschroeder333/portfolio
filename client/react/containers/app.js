import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Home from '../components/home.js';
import About from '../components/about';
import Contact from '../components/contact';
import Projects from '../components/projects.js';

export default () => (
    <BrowserRouter>
      <div>
        <h5>nav</h5>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/projects" component={Projects} />
      </div>
    </BrowserRouter>
);
