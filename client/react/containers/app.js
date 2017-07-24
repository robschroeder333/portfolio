import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Home from '../components/home.js';
import Projects from '../components/projects.js';

export default () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/projects" component={Projects} />
      </Switch>
    </BrowserRouter>
);
