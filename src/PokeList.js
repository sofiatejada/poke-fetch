import React, { Component } from 'react'
import PokeItem from './PokeItem';

export default class PokeList extends Component {
    render() {
        return (
            <div>
                    <PokeItem booger={this.props.pokemon} />
            </div>
        )
    }
}
