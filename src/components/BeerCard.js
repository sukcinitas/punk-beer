import React from 'react';

class BeerCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const beer = this.props.info.map((beer) => (
        <div>
            <h2>{beer.name}</h2>
            <small>{beer.tagline}</small>
            <img src={beer.image_url} height="300" style={{"display":"block"}}/>
            <p>{beer.description}</p>
            <small>{beer.abv} ABV</small>
            <small>{beer.ibu} IBU</small>
            <small>{beer.ebc} EBC</small>
            <ul>Pair with:
                {beer.food_pairing.map(food => <li>{food}</li>)}
            </ul>
            <p>Brewers Tips: {beer.brewers_tips}</p>
        </div>))
        return (
            <>
                {beer}
            </>
        )
    }
}

export default BeerCard;