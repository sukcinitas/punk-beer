import React from 'react';
import BeerCard from './components/BeerCard';


class Random extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      beer: []
    }
  }
  componentDidMount() {
    fetch(`https://api.punkapi.com/v2/beers/random`)
      .then(response => response.json())
      .then(res => {
        this.setState ({
            beer: res
        })
      }); 
  }
  render() {
    return (
      <>
        <BeerCard info={this.state.beer}/>
      </>
    )
  }
}

export default Random;
