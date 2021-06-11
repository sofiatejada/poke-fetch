import React, { Component } from 'react'
import request from 'superagent';
import PokeList from './PokeList';

export default class Main extends Component {


    state = {
        pokedex: [],
        loading: false,
        query: '',
        direction: 'asc',
        type: '',
    }

    componentDidMount = async () => {
        await this.fetchPokeData();
    }

    fetchPokeData = async () => {
        this.setState({ loading: true });

        const URL = this.state.query ? `https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon=${this.state.query}&sort=pokemon&direction=${this.state.direction}` : `https://pokedex-alchemy.herokuapp.com/api/pokedex?sort=pokemon&direction=${this.state.direction}`

        const data = await request.get(URL);
        console.log(data);
        this.setState({ loading: false })
        this.setState({ pokedex: data.body.results })
    }

    handleClick = async () => {
        await this.fetchPokeData();
    }

    handleChange = (e) => {
        this.setState({ query: e.target.value });
    }

    sortOrder = async (e) => {
        this.setState({ direction: e.target.value });
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
                    <button onClick={this.handleClick}>Get that Pokemon!</button>
                </section>
                <section>
                    {this.state.pokedex.map(item => <PokeList pokemon={item}/>)}
                </section>

            </div>
        )
    }
}
