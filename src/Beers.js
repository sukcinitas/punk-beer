import React from 'react';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import BeerCard from './components/BeerCard';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

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
    //setState is not neceserraly synchronous, so I use callback
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

    render() {
      const id = this.state.id;
      console.log(id)
      const beers = this.state.beers.map((beer)=> {
        return (<div>
                  <h1>{beer.name}</h1>
                  <small>{beer.tagline}</small>
                  <img src={beer.image_url} height="300" style={{"display":"block"}}/>
                  <button data-id={beer.id} onClick={this.handleClick}>Read more </button>
                  <hr></hr>
                </div>)
      });
      return (
        <>
            <SearchBar />          
            <FilterBar />
            {beers}
            <button onClick={this.handlePreviousPage}>Back</button>
            <button onClick={this.handleNextPage}>Next</button> 
            <BeerCard info={this.state.beer}/>
        </>
      ) 
    }
  }
  
  export default Beers;