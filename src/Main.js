import React, { Component } from 'react'
import request from 'superagent';
import PokeList from './PokeList';

export default class Main extends Component {


    state = {
        pokemon: [],
    }

    componentDidMount = async () => {
        const data = await request.get('https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon');
        console.log(data)
        // this.setState({ pokemon:  })

    }

    fetchPokeData = async () => {
        const data = await request.get('https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon');
        console.log(data);
    }





    render() {
        return (
            <div>
                <section>
                    <label>
                        <input />
                    </label>
                    <button onClick={this.fetchPokeData}>Get that Pokemon!</button>
                </section>
                <section>
                    <PokeList pokedex={filteredPokedex}/>
                </section>

            </div>
        )
    }
}
