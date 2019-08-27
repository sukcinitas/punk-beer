import React from 'react';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import BeerCard from './components/BeerCard';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

class Beers extends React.Component {
    constructor() {
      super();
      this.state = {
        page: 1,
        beers: [],
        id: "random",
        beer: []
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleNextPage = this.handleNextPage.bind(this);
      this.handlePreviousPage = this.handlePreviousPage.bind(this);
    }
//on mount first 15 beers are displayed
    componentDidMount() {
        fetch(`https://api.punkapi.com/v2/beers?page=${this.state.page}&per_page=15`)
          .then(response => response.json())
          .then(res => {
            console.log(res)
            this.setState({
              beers: Array.from(res)
            })
          });
    }
// i get id of beer
    handleClick(e){ 
      this.setState({
        id: e.target.dataset.id
      }, ()=> {
        fetch(`https://api.punkapi.com/v2/beers/${this.state.id}`)
          .then(response => response.json())
          .then(res => {
            console.log(res)
            this.setState({
              beer: res
            })
          });
      })
    }

    handleNextPage(){
      this.setState({
        page: this.state.page + 1
      }, () => {
        fetch(`https://api.punkapi.com/v2/beers?page=${this.state.page}&per_page=15`)
          .then(response => response.json())
          .then(res => {
            console.log(res)
            this.setState({
              beers: Array.from(res)
            })
          });
      }) 
    }
    //setState is not necessarily synchronous, so I use callback
    handlePreviousPage(){
      this.setState({
        page: this.state.page - 1
      }, () => {
        fetch(`https://api.punkapi.com/v2/beers?page=${this.state.page}&per_page=15`)
          .then(response => response.json())
          .then(res => {
            console.log(res)
            this.setState({
              beers: Array.from(res)
            })
          });
      })  
    }
// at first i used button but button cannot be inside link tag and vice versa
    render() {
      const id = this.state.id;
      console.log(id)
      const beers = this.state.beers.map((beer)=> {
        return (<div>
                  <h1>{beer.name}</h1>
                  <small>{beer.tagline}</small>
                  <img src={beer.image_url} height="300" style={{"display":"block"}}/>
                  <Link to={`/beers/${beer.id}`}><p data-id={beer.id} onClick={this.handleClick}>Read more</p></Link>
                  <hr></hr>
                </div>)
      });
      return (
        <>
            <SearchBar />          
            <Switch>
            <Route path="/beers/:id" render={(props)=> <BeerCard info={this.state.beer}/> }></Route>
            <Route path="/beers">
              <FilterBar />
              {beers}
              <button onClick={this.handlePreviousPage}>Back</button>
              <button onClick={this.handleNextPage}>Next</button> 
            </Route>
            </Switch>
            
        </>
      ) 
    }
  }
  
  export default Beers;