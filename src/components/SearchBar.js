import React from 'react';
import { Link } from 'react-router-dom';

const data = [
    {
        id: "par1",
        value: "beer_name",
        placeholder: "Search by Name...(e.g., Trashy Blonde)",
        name: "beer name"

    },
    {
        id: "par2",
        value: "yeast",
        placeholder: "Search by Yeast...(e.g., Wyeast 3522 - Belgian Ardennes)",
        name: "yeast"
    },
    {
        id: "par3",
        value: "hops",
        placeholder: "Search by Hops...(e.g., Amarillo)",
        name: "hops"
    },
    {
        id: "par4",
        value: "malt",
        placeholder: "Search by Malt...(e.g., Wheat)",
        name: "malt"
    },
    {
        id: "par5",
        value: "brewed_before",
        placeholder: "Brewed Before...(mm-yyyy)",
        name: "brewed before"
    },
    {
        id: "par6",
        value: "brewed_after",
        placeholder: "Brewed After...(mm-yyyy)",
        name: "brewed after"
    }
]

class SearchOption extends React.Component {
    render() {
        return (
            <div className="search-option">
                <input 
                    type="radio" 
                    id={this.props.option.id} 
                    key={this.props.option.id} 
                    name="search-param" 
                    value={this.props.option.value} 
                    data-placeholder={this.props.option.placeholder} 
                    checked={this.props.chosen === this.props.option.value} 
                    onChange={this.props.handler}
                />
                <label htmlFor={this.props.option.id}>{this.props.option.name}</label>
            </div> 
        )
    }
}

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            placeholder: data[0].placeholder,
            options: "beer_name",
            searchbeers: [],
            input: "",

        }
        this.handleChange = this.handleChange.bind(this);
        this.handler = this.handler.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
      }

    handleChange (e) {
        this.setState ({
          input: e.target.value
        }, () => {
          fetch(`https://api.punkapi.com/v2/beers?${this.state.options}=${(this.state.input).split(" ").join("_")}`)
          .then(response => response.json())
          .then(data => {
            this.setState({
              searchbeers: Array.from(data)
            })
          });  
          if (this.state.input)  {
            document.querySelector("#list").style.display = "block";
          }   
        })
    }

    handler(e) {
        this.setState ({
            options: e.target.value,
            placeholder: e.target.dataset.placeholder
          })
    }
    handleMouseOut() {
        document.querySelector("#list").style.display = "none";  
    }
    handleMouseOver(e){
        if (!this.state.input)  {
            return;
          } 
        document.querySelector("#list").style.display = "block";
    }
    render() {
        console.log(this.state.input)
        const searchbeers = this.state.searchbeers.map(beer => {return <li data-id={beer.id}><Link to={`/beers/${beer.id}`} >{beer.name}</Link></li>});
        
        const searchOptions = data.map(item => {
            return <SearchOption key={item.id} option={item} chosen={this.state.options} handler={this.handler}/>
        });
        return (
            <div id="searchbar" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>  
                <input id="search-box" placeholder={this.state.placeholder} onChange = {this.handleChange} value={this.state.input} name="inputField" autoComplete="off"></input>
                <form>
                    {searchOptions}
                </form>
                <ul id="list">
                    {searchbeers}
                </ul>

            </div>              

        )
    }
}

export default SearchBar;