import React from 'react';
import Tile from './Tile';

export default class Side extends React.Component {

    constructor () {
        super();
        this.renderTiles = this.renderTiles.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.handlePieceSelection = this.handlePieceSelection.bind(this);
        this.state = {
            selected : {
                value : -1,
                piece : {}
            }
        };
    }

    handlePieceSelection(key, item) {
        console.log("Key: " + key);

        if (this.isSelected(key)) {
            this.setState({
                selected : {
                    value : -1,
                    piece : 0
                }
            });
            this.props.handleTileSelection(item, key, true);
        } else {
            this.setState({
                selected : {
                    value : key,
                    piece : item
                }
            });

            this.props.handleTileSelection(item, key, false);

            setTimeout(
                function() {
                    this.setState({
                        selected : {
                            value : -1,
                            piece : 0
                        }
                    });
                }.bind(this),
                2500
            );
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
                                    onClick={() => this.handlePieceSelection(key, item)}
                                    value={item}
                                />
                            </div>
                        );
                    })}
                </div>)
        }
    }

    isSelected(key) {
        return (key === this.state.selected.value);
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