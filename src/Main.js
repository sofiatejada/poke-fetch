import React, { Component } from 'react'
import request from 'superagent';
import PokeList from './PokeList';
import Spinner from './Spinner';

export default class Main extends Component {


    state = {
        pokedex: [],
        loading: false,
        query: '',
        direction: 'asc',
        type: '',
    }

    componentDidMount = async () => {
        await this.fetchPokemon();
    }

    // fetchPokeData = async () => {
    //     this.setState({ loading: true });

    //     const URL = this.state.query ? `https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon=${this.state.query}&sort=pokemon&direction=${this.state.direction}` : `https://pokedex-alchemy.herokuapp.com/api/pokedex?sort=pokemon&direction=${this.state.direction}`

    //     const data = await request.get(URL);
    //     console.log(data);
    //     this.setState({ loading: false })
    //     this.setState({ pokedex: data.body.results })
    // }

    fetchPokemon = async () => {

        this.setState({ loading: true });

        const searchParams = new URLSearchParams({
            sort: 'pokemon',
            direction: this.state.direction,
        });
        if (this.state.query) {
            searchParams.set('pokemon', this.state.query);
        }

        const {
            body: { results: data },
        } = await request.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex?${searchParams.toString()}`);
        this.setState({ loading: false });
        this.setState({ pokedex: data });
    }


    fetchTypeData = async () => {
        this.setState({ loading: true });
        const URL = this.state.type ? `https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon=${this.state.query}&sort=type&direction=${this.state.direction}&type=${this.state.type}` : `https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon=${this.state.query}&sort=pokemon&direction=${this.state.direction}`

        const data = await request.get(URL);
        this.setState({ loading: false });
        this.setState({ pokedex: data.body.results });
    }

    handleClick = async () => {
        await this.fetchPokemon();
    }

    handleTypeClick = async () => {
        await this.fetchTypeData();
    }

    handleChange = (e) => {
        this.setState({ query: e.target.value });
    }

    sortOrder = async (e) => {
        this.setState({ direction: e.target.value });
    }

    typeSearch = async (e) => {
        this.setState({ type: e.target.value });
    }


    render() {
        return (
            <div>
                <section>
                    <label>
                        <input onChange={this.handleChange}/>
                    </label>
                    <select onChange={this.sortOrder}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <select onChange={this.typeSearch}>
                        <option value="">--Type--</option>
                        <option value="normal">Normal</option>
                        <option value="fire">Fire</option>
                        <option value="fighting">Fighting</option>
                        <option value="water">Water</option>
                        <option value="flying">Flying</option>
                        <option value="grass">Grass</option>
                        <option value="poison">Poison</option>
                        <option value="electric">Electric</option>
                        <option value="ground">Ground</option>
                        <option value="psychic">Psychic</option>
                        <option value="rock">Rock</option>
                        <option value="ice">Ice</option>
                        <option value="bug">Bug</option>
                        <option value="dragon">Dragon</option>
                        <option value="ghost">Ghost</option>
                        <option value="dark">Dark</option>
                        <option value="steel">Steel</option>
                        <option value="fairy">Fairy</option>
                    </select>
                    <button onClick={this.handleClick}>Get that Pokemon!</button>
                    <button onClick={this.handleTypeClick}>Search by Type</button>
                </section>
                <section>
                {this.state.loading? <Spinner /> : this.state.pokedex.map(item => <PokeList pokemon={item}/>)}
                </section>

            </div>
        )
    }
}
