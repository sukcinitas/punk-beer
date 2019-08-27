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
        beer: [],
        url: ["https://api.punkapi.com/v2/beers?per_page=15"]
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleNextPage = this.handleNextPage.bind(this);
      this.handlePreviousPage = this.handlePreviousPage.bind(this);
      this.handleFilter = this.handleFilter.bind(this);
      this.updateUrl = this.updateUrl.bind(this);
    }
//on mount first 15 beers are displayed
    componentDidMount() {
        fetch(`${this.state.url.join("&")}&page=${this.state.page}`)
          .then(response => response.json())
          .then(res => {
            console.log(res)
            this.setState({
              beers: Array.from(res)
            })
          });
    }
// i get id of beer
    handleFilter() {
      fetch(`${this.state.url.join("&")}&page=${this.state.page}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          beers: Array.from(data),
          //url: ["https://api.punkapi.com/v2/beers?"]
        })
      });
    }
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
        fetch(`${this.state.url.join("&")}&page=${this.state.page}`)
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
        fetch(`${this.state.url.join("&")}&page=${this.state.page}`)
          .then(response => response.json())
          .then(res => {
            console.log(res)
            this.setState({
              beers: Array.from(res)
            })
          });
      })  
    }
    updateUrl(e) {
      const index = (this.state.url).indexOf(e.target.dataset.url);

      if (index > -1) {
          this.setState ({
              url: [...(this.state.url).slice(0, index), ...(this.state.url).slice(index + 1)]
          });
          return;
      }
      this.setState ({
          url: [...this.state.url, e.target.dataset.url]
      })
  }
// at first i used button but button cannot be inside link tag and vice versa
    render() {
      const id = this.state.id;
      const beers = this.state.beers.map((beer)=> {
        return (<div>
                  <h1>{beer.name}</h1>
                  <small>{beer.tagline}</small>
                  <img src={beer.image_url} height="300" style={{"display":"block"}}/>
                  <Link to={`/beers/${beer.id}`}><p data-id={beer.id} onClick={this.handleClick}>Read more</p></Link>
                  <hr></hr>
                </div>)
      });
      console.log(this.state.beers)
      return (
        <>          
            <Switch>
            <Route path="/beers/:id" render={(props)=> <BeerCard info={this.state.beer}/> }></Route>
            <Route path="/beers">
              <FilterBar filter={this.handleFilter} updateurl={this.updateUrl}/>
              {beers.length === 0 ? "Nothing to show" : beers}
              <button onClick={this.handlePreviousPage} style={(this.state.page === 1 ? {display: "none"} : {display:"initial"})}>Back</button>
              {this.state.page}
              {`${this.state.url.join("&")}&page=${this.state.page}`}
              <button onClick={this.handleNextPage} style={beers.length === 0 ? {display: "none"} : {display:"initial"}}>Next</button> 
            </Route>
            </Switch>   
        </>
      ) 
    }
  }
  
  export default Beers;