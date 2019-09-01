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
        url: ["https://api.punkapi.com/v2/beers?per_page=16"]
      }
      this.getBeers = this.getBeers.bind(this);
      this.handleNextPage = this.handleNextPage.bind(this);
      this.handlePreviousPage = this.handlePreviousPage.bind(this);
      this.handleFilter = this.handleFilter.bind(this);
      this.updateUrl = this.updateUrl.bind(this);
    }
    //used to get beers array according to page and filter parameters set in url
    getBeers(url, page) {
      fetch(`${url.join("&")}&page=${page}`)
          .then(response => response.json())
          .then(res => {
            this.setState({
              beers: Array.from(res)
            })
          });
    }
    //on mount beers of first page are displayed
    componentDidMount() {
      this.getBeers(this.state.url, this.state.page);
    }

    //beers meeting filtering criteria in url are rendered from page 1
    handleFilter() {
      this.setState({
        page: 1
      }, () => this.getBeers(this.state.url, this.state.page)
      )
    }

    //setState is not necessarily synchronous, so I use callback
    handleNextPage(){
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.getBeers(this.state.url, this.state.page);
      }) 
    }

    handlePreviousPage(){
      this.setState({
        page: this.state.page - 1
      }, () => {
        this.getBeers(this.state.url, this.state.page);
      })  
    }

    updateUrl(e) {
      const index = (this.state.url).indexOf(e.target.dataset.url);
      e.target.classList.add("active");
      //if filtering parameter is already in url, it means it was selected, so it's deselected by removing it from array, otherwise it is added to array list
      if (index > -1) {
          this.setState ({
              url: [...(this.state.url).slice(0, index), ...(this.state.url).slice(index + 1)]
          });
          e.target.classList.remove("active");
          return;
      }
      this.setState ({
          url: [...this.state.url, e.target.dataset.url]
      })
  }
    // at first i used button but button cannot be inside link tag and vice versa
    render() {
      const beers = this.state.beers.map((beer)=> {
        return (<div key={beer.id} className="beers-beer-card">
                  <img src={beer.image_url} alt={beer.name}/>
                  <h1 data-line={beer.tagline}>{beer.name}</h1>
                  <h4>{beer.tagline}</h4>
                  <NavLink to={`/beers/${beer.id}`}><p data-id={beer.id}>Read more</p></NavLink>
                </div>)
      });
      return (
        <div id="beers-main" className="main">          
              <FilterBar filter={this.handleFilter} updateurl={this.updateUrl}/>
              {beers.length === 0 ? "Nothing to show" : <div id="beers">{beers}</div>}
              <div className="pages">
                <button onClick={this.handlePreviousPage} style={(this.state.page === 1 ? {display: "none"} : {display:"initial"})}>Back</button>
                {this.state.page}
                {/* {`${this.state.url.join("&")}&page=${this.state.page}`} */}
                <button onClick={this.handleNextPage} style={beers.length === 0 ? {display: "none"} : {display:"initial"}}>Next</button> 
              </div>
        </div>
      ) 
    }
  }
  
  export default Beers;