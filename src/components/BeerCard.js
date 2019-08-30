import React from 'react';


class BeerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beer: [],
            id: this.props.match.params.id

        }
    }
    
    componentDidMount() {
        fetch(`https://api.punkapi.com/v2/beers/${this.state.id}`)
          .then(response => response.json())
          .then(res => {
            this.setState({
              beer: Array.from(res)
            })
          });
    }
    
    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        console.log(prevProps.match.params.id !== this.props.match.params.id)
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                id: this.props.match.params.id
            },  () => {
                fetch(`https://api.punkapi.com/v2/beers/${this.state.id}`)
                    .then(response => response.json())
                    .then(res => {
                        this.setState({
                        beer: Array.from(res)
                        })
                    });
            }
        )
        }
    }

    render() {
        const beer = this.state.beer.map((beer, index) => {
            return (<div className="beer-card" key={beer.name}>
                <div id="beer-card-header">
                    <h2>{beer.name}</h2>
                    <h4>{beer.tagline}</h4>
                </div>
                <img src={beer.image_url || "beer.png"} alt={beer.name} height="300px" style={{"display":"block"}}/>
                <div id="beer-card-main">
                    <div id="beer-card-props">
                        <small>{beer.abv} ABV</small>
                        <small>{beer.ibu} IBU</small>
                        <small>{beer.ebc} EBC</small>
                    </div>
                    <p>{beer.description}</p>
                    <ul>Food pairing:
                        {beer.food_pairing.map(food => <li>{food}</li>)}
                    </ul>
                    <p>Brewers Tips: {beer.brewers_tips}</p>
                </div>
            </div>)
        })
        return (
            <div class="main">
                {beer}
            </div>
        )
    }
}

export default BeerCard;