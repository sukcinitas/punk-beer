import React from 'react';
import FilterBar from './components/FilterBar';
import { NavLink } from 'react-router-dom';

class Beers extends React.Component {
    constructor() {
      super();
      this.state = {
        page: 1,
        beers: [],
        id: "random",
        url: ["https://api.punkapi.com/v2/beers?per_page=15"]
      }
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
          beers: Array.from(data)
        })
      });
    }


    handleNextPage(){
      this.setState({
        page: this.state.page + 1
      }, () => {
        fetch(`${this.state.url.join("&")}&page=${this.state.page}`)
          .then(response => response.json())
          .then(res => {
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
      const beers = this.state.beers.map((beer)=> {
        return (<div key={beer.id}>
                  <h1>{beer.name}</h1>
                  <small>{beer.tagline}</small>
                  <img src={beer.image_url} height="300" alt={beer.name} style={{"display":"block"}}/>
                  <NavLink to={`/beers/${beer.id}`}><p data-id={beer.id} >Read more</p></NavLink>
                  <hr></hr>
                </div>)
      });
      return (
        <>          
            {/* <Switch>
            <Route path="/beers/:id" component={BeerCard}></Route>
            <Route path="/beers"> */}
              <FilterBar filter={this.handleFilter} updateurl={this.updateUrl}/>
              {beers.length === 0 ? "Nothing to show" : beers}
              <button onClick={this.handlePreviousPage} style={(this.state.page === 1 ? {display: "none"} : {display:"initial"})}>Back</button>
              {this.state.page}
              {`${this.state.url.join("&")}&page=${this.state.page}`}
              <button onClick={this.handleNextPage} style={beers.length === 0 ? {display: "none"} : {display:"initial"}}>Next</button> 
            {/* </Route>
            </Switch>    */}
        </>
      ) 
    }
  }
  
  export default Beers;