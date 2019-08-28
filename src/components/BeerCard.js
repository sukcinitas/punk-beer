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
            },    () => {
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
       console.log( this.state.id);
        const beer = this.state.beer.map((beer, index) => 
        <div key={beer.name}>
            <h2>{beer.name}</h2>
            <small>{beer.tagline}</small>
            <img src={beer.image_url} height="300" alt={beer.name} style={{"display":"block"}}/>
            <p>{beer.description}</p>
            <small>{beer.abv} ABV</small>
            <small>{beer.ibu} IBU</small>
            <small>{beer.ebc} EBC</small>
            <ul>Pair with:
                {beer.food_pairing.forEach(food => <li>{food}</li>)}
            </ul>
            <p>Brewers Tips: {beer.brewers_tips}</p>
        </div>)
        return (
            <>
                {beer}
            </>
        )
    }
}

export default BeerCard;