import React, { Component } from 'react';
import request from 'superagent';

export default class PokeDetail extends Component {

    state = {
        detail: {},
    };

    componentDidMount() {
        this.fetchPokeDetail();
    }

    fetchPokeDetail = async () => {
        const apiId = this.props.match.params.pokeId;
        const data = await request.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex/${apiId}`);
        this.setState({ detail: data.body })
    }


    render() {
        console.log(this.props);
        return (
            <div>
                <h2>Pokemon Details</h2>
                {this.props.match.params.pokeId}
                {this.state.detail.pokemon}
            </div>
        )
    }
}
