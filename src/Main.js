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
        page: 1,
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
            page: this.state.page,
        });
        if (this.state.query) {
            searchParams.set('pokemon', this.state.query);
        }

        const {
            body: { results: data },
        } = await request.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex?${searchParams.toString()}`);


        console.log(this.props.location);

        const location = {
            pathname: this.props.location.pathname,
            search: searchParams.toString(),
        };

        this.props.history.push(location);

        this.setState({ loading: false });
        this.setState({ pokedex: data });
    }


    fetchTypeData = async () => {
        this.setState({ loading: true });

        const searchParams = new URLSearchParams({
            sort: 'type',
            direction: this.state.direction,
            page: this.state.page,
        });
        if (this.state.type) {
            searchParams.set('type', this.state.type)
            console.log(searchParams);
        }

        const {
            body: { results: data },
        } = await request.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex?${searchParams.toString()}`);

        this.setState({ loading: false });
        this.setState({ pokedex: data });


        // const URL = this.state.type ? `https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon=${this.state.query}&sort=type&direction=${this.state.direction}&type=${this.state.type}` : `https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon=${this.state.query}&sort=pokemon&direction=${this.state.direction}`

        // const data = await request.get(URL);
    //     this.setState({ loading: false });
    //     this.setState({ pokedex: data.body.results });
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
        await this.setState({ direction: e.target.value });
        this.fetchPokemon();
    }

    typeSearch = async (e) => {
        this.setState({ type: e.target.value });
    }

    setPage = async (e) => {
        await this.setState({ page: this.state.page + 1 });
        this.fetchPokemon();
    }

    setPreviousPage = async (e) => {
        await this.setState({ page: this.state.page - 1 });
        this.fetchPokemon();
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
                <div>
                    <button onClick={this.setPreviousPage}>Previous ({this.state.page - 1})</button>
                    <button onClick={this.setPage}>Next Page ({this.state.page + 1})</button>
                </div>

            </div>
        )
    }
}
