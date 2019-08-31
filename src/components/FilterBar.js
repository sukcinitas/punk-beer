import React from 'react';


const ibu = {
    values: {
    "8-12": "ibu_gt=7&ibu_lt=13",
    "10-20": "ibu_gt=9&ibu_lt=21",
    "20-40": "ibu_gt=19&ibu_lt=41",
    "30-40": "ibu_gt=29&ibu_lt=41",
    "30-50": "ibu_gt=29&ibu_lt=51",
    "60-80": "ibu_gt=59&ibu_lt=81",
    "70-100": "ibu_gt=69&ibu_lt=99",
    "80-100": "ibu_gt=79&ibu_lt=99"
    },
    units: "IBU"
}
const ebc = {
    values: {
    "4": "ebc_gt=3&ebc_lt=5",
    "6": "ebc_gt=5&ebc_lt=7",
    "8": "ebc_gt=7&ebc_lt=9",
    "12": "ebc_gt=11&ebc_lt=13",
    "16": "ebc_gt=15&ebc_lt=17",
    "20": "ebc_gt=19&ebc_lt=21",
    "26": "ebc_gt=32&ebc_lt=34",
    "39": "ebc_gt=38&ebc_lt=40",
    "47": "ebc_gt=46&ebc_lt=48",
    "57": "ebc_gt=56&ebc_lt=58",
    "69": "ebc_gt=68&ebc_lt=70",
    "79": "ebc_gt=78&ebc_lt=80",
    "139": "ebc_gt=138&ebc_lt=140",
    ">139": "ebc_gt=139"
    },
    units: "EBC"
}

const abv = {
    values: {
    "0-6": "abv_gt=0&abv_lt=7",
    "6-12": "abv_gt=5&abv_lt=13",
    ">12": "abv_gt=12"
    }, 
    units: "%"
}
//Three Filters: abv, ibu, ebc will go into FilterBar

//Filter returns all buttons with certain options of that filter, onClick - url inside Beers component is updated to filtering options
class Filter extends React.Component {
    render() {
        const allKeys = Object.keys(this.props.filter.values);
        const allBtns = allKeys.map(keyName => {
            return <button className="filter-btn" key={keyName} onClick={this.props.click} data-url={this.props.filter.values[keyName]} className="btn">{keyName} {this.props.filter.units}</button>
        })
        return (
            <div id={this.props.filter.units} style={{"display": `${this.props.styling}`}}> 
                {allBtns}
            </div>
        )
    }
}


class FilterBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersDisplay: "none",
            hover: false,
            hoveredFilter: "none",
        }
        this.displayFilters = this.displayFilters.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
        
    }

    displayFilters() {
        this.setState ({
            filtersDisplay: "initial"
        })
    }

    toggleHover(e) {
        this.setState ({
            hover: !this.state.hover,
            hoveredFilter: e.target.id
        })        
    }
    
    
    render() {
        return (        
                /* When "Filter" button is clicked, filtering groups are displayed. 
                Upon hovering filtering group(abv, ebc, ibu), Filter component with all its options is displayed.
                On mouse leave, filtering group's id is remembered, so filtering group options are displayed
                till another filtering group is hovered on*/
            <>
                <button onClick={this.displayFilters}>Filter</button>
                <small>Several filtering criteria can be selected</small>

                <div style={{"display":`${this.state.filtersDisplay}`}}>
                    <button id="abv" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>ABV</button>
                    <button id="ibu" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>IBU</button>
                    <button id="ebc" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>EBC</button>
                

                    <Filter styling={this.state.hoveredFilter === "abv" ? "block" : "none"} filter={abv} click={this.props.updateurl}/>
                    <Filter styling={this.state.hoveredFilter === "ibu"? "block" : "none"} filter={ibu} click={this.props.updateurl}/>
                    <Filter styling={this.state.hoveredFilter === "ebc"? "block" : "none"} filter={ebc} click={this.props.updateurl}/>

                    <button onClick={this.props.filter}>Filter out</button>
                </div>
                {/* When filter out is clicked, beers meeting the filtering criteria are fetched and displayed */}
            </>
    )}
}

export default FilterBar;