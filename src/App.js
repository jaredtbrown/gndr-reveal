import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import RevealForm from './components/RevealForm';
import Reveal from './components/Reveal';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={RevealForm} />
        <Route exact path="/:id" component={Reveal} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
