import React from 'react';
import './App.css';
import Beers from './Beers';
import { Route, Link} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <>
        <Link to="/beers">EXPLORE</Link>
        <Route path="/beers" component={Beers} />
      </>
    )
  }
}

export default App;
