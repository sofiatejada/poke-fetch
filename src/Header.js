import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div>
                <h3>Pokedex</h3>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/pokemon">Pokemon</NavLink>
                </nav>
            </div>
        )
    }
}
