import React from 'react';
import Beers from './Beers';
import { Route, Link} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <>
        <h1 id="other">Punk Beer</h1>
        <div className="main explore">
          <Link id="explore-btn" to="/beers">Explore</Link>
          <Route path="/beers" component={Beers} />
        </div>
      </>
    )
  }
}

export default App;
