import React from 'react';
import Tile from './Tile';

export default class Side extends React.Component {

    constructor () {
        super();
        this.renderTiles = this.renderTiles.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.handlePieceSelection = this.handlePieceSelection.bind(this);
        this.state = {
            selected : -1
        };
    }

    handlePieceSelection(key) {
        console.log("Key: " + key);
        if (this.isSelected(key)) {
            this.setState({
                selected : -1
            });
        } else {
            this.setState({
                selected : key
            });
        }

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
                                    isSelected={(this.isSelected(key))}
                                    onClick={() => this.handlePieceSelection(key)}
                                    value={item}
                                />
                            </div>
                        );
                    })}
                </div>)
        }
    }

    isSelected(key) {
        return (key === this.state.selected);
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