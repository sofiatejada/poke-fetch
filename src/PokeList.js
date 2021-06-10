import React, { Component } from 'react'
import PokeItem from './PokeItem';

export default class PokeList extends Component {
    render() {
        return (
            <div>
                {this.props.pokedex.map(pokemon => <PokeItem booger={pokemon} />)}
            </div>
        )
    }
}
