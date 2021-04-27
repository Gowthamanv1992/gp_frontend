import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import AddSimulation from './components/AddSimulation.js';
import CreateSimulation from './components/CreateSimulation.js';
import HomePage from './components/HomePage.js';
import SignIn from './components/SignIn.js'; 
import ListSimulations from './components/ListSimulations.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SimulationResults from './components/SimulationResults';
import AboutUs from './components/AboutUs.js';
import Help from "./components/Help.js";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Switch>
          <Route path="/simulations" component={ListSimulations}/>
          <Route path="/run" component={AddSimulation}/>
          <Route path="/create" component={CreateSimulation}/>
          <Route path="/signin"  component={SignIn} />
          <Route path="/results"  component={SimulationResults} />
          <Route path="/about_us"  component={AboutUs} />
          <Route path="/help"  component={Help} />
          <Route path="/"  component={HomePage} />
        </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
