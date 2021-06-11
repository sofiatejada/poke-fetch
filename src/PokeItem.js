import React, { Component } from 'react'

export default class PokeItem extends Component {
    render() {
        return (
            <div>
                <img src={this.props.booger.url_image} alt={this.props.booger.pokemon} />
                <h4>{this.props.booger.pokemon}</h4>
                <ul>
                    <li>Number: {this.props.booger.id}</li>
                    <li>{this.props.booger.type_1}</li>
                    <li>{this.props.booger.type_2}</li>
                </ul>
            </div>
        )
    }
}
