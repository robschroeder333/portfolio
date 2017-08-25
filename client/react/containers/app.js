import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../components/home.js';
import About from '../components/about.js';
import Contact from '../components/contact.js';
import Projects from '../components/projects.js';
import Nav from '../components/nav.js';
import Workshop from '../components/workshop.js';
import Javascript from '../components/javascript.js';
import Snake from '../components/jsProjects/snake.js';

export default () => (
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/projects" component={Projects} />
        <Route path="/workshop" component={Workshop} />
        <Route path="/js" component={Javascript} />
        <Route path="/Snake" component={Snake} />
      </div>
);
