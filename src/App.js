import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      beers: []
    }
  }

  componentDidMount() {
      fetch('https://api.punkapi.com/v2/beers?page=1&per_page=5')
        .then(response => response.json())
        .then(res => {
          console.log(res)
          this.setState({
            beers: Array.from(res)
          })
        });
      
  }
  render() {
    return (
      <>
        <SearchBar />
        {this.state.beers.map((beer)=> {
          return (<>
            <h1>{beer.name}</h1>
            <p>{beer.description}</p>
                  </>)
        })}
      </>
    )
  }
}

export default App;
