import React from 'react';
import './App.css';
import Beers from './Beers';
import { Route, Link} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      
      <div class="main explore">
        <Link id="explore-btn" to="/beers">Explore</Link>
        <Route path="/beers" component={Beers} />
      </div>
    )
  }
}

export default App;
