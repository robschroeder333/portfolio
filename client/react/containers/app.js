import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Home from '../components/home.js';
import About from '../components/about.js';
import Contact from '../components/contact.js';
import Projects from '../components/projects.js';
import Nav from '../components/nav.js';

export default () => (
    <BrowserRouter>
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/projects" component={Projects} />
      </div>
    </BrowserRouter>
);
