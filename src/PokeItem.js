import React, { Component } from 'react'

export default class PokeItem extends Component {

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <div>
                <img src={this.props.booger.url_image} alt={this.props.booger.pokemon} />
                <h4>{this.props.booger.pokemon}</h4>
                <ul>
                    <li>Number: {this.props.booger.id}</li>
                    <li>Primary Type: {this.capitalizeFirstLetter(this.props.booger.type_1)}</li>
                    {this.props.booger.type_2 === 'NA' ? <li style={{display: "none"}}></li> : <li>Secondary Type: {this.capitalizeFirstLetter(this.props.booger.type_2)}</li>}
                </ul>
                <h4>Stats</h4>
                <ul>
                    <li>Attack: {this.props.booger.attack}</li>
                    <li>Defense: {this.props.booger.defense}</li>
                    <li>HP: {this.props.booger.hp}</li>
                    <li>Special Attack: {this.props.booger.special_attack}</li>
                    <li>Special Defense: {this.props.booger.special_defense}</li>
                    <li>Speed: {this.props.booger.speed}</li>
                </ul>
            </div>
        )
    }
}
