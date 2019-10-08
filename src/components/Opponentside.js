import React from 'react';
import Tile from './Tile';

export default class Opponentside extends React.Component {

    constructor () {
        super();
        this.renderTiles = this.renderTiles.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            selected : {
                value : -1,
                piece : {}
            }
        };
    }

    handleClick() {

    }

    renderTiles(tiles) {
        if (tiles) {

            return (
                <div>
                    {Object.keys(tiles).map(key => {
                        let item = tiles[key];
                        return (
                            <div key={`${key}`}>
                                <Tile
                                    isSelected={false}
                                    onClick={this.handleClick}
                                    value={item}
                                />
                            </div>
                        );
                    })}
                </div>)
        }
    }

    render() {
        return (
            <div className="side">
                {
                    this.renderTiles(this.props.pieces)
                }
            </div>
        );
    }
}