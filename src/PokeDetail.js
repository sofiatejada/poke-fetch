import React, { Component } from 'react';
import request from 'superagent';
import Spinner from './Spinner';


export default class PokeDetail extends Component {

    state = {
        detail: [],
        loading: false,
    };

    componentDidMount() {
        this.fetchPokeDetail();
    }

    fetchPokeDetail = async () => {

        this.setState({ loading: true });


        const apiId = this.props.match.params.pokeId;
        const data = await request.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex/${apiId}`);

        this.setState({ loading: false });
        this.setState({ detail: data.body })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    render() {
        console.log(this.state.detail);
        console.log(this.props);
        return (
            <div>
                <h2>Pokemon Details</h2>
                
                {this.state.loading && <Spinner />}
                {!this.state.loading && (
                    <article>
                        <h3>{this.state.detail.pokemon}</h3>
                        <img src={this.state.detail.url_image} alt={this.state.detail.pokemon} />
                    </article>
                )}
            </div>
        )
    }
}
