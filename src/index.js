import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Beers from './Beers';
import About from './About';
import BeerCard from './components/BeerCard';
import SearchBar from './components/SearchBar';
import * as serviceWorker from './serviceWorker';


  const routing = (
    <Router>
      <div id="main">
        <h1 id="bg">Punk Beer</h1>
        <h1 id="header">Punk Beer</h1>
        <SearchBar />
        <ul id="navigation">
          <li>
            <Link to="/">Home</Link>
          </li>   
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/beers">Beers</Link>
          </li>
          <li>
            <Link to="/beers/random">Random</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/beers/:id" render={({match})=> <BeerCard match={match}/>} />
          <Route exact path="/" component={App} />
          <Route path="/beers" component={Beers} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
