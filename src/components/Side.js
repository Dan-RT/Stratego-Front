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
                x:-1,
                y:-1
            }
        };
    }

    handlePieceSelection(item_x, item_y) {

        if (this.isSelected(item_x, item_y)) {
            this.setState({
                selected : {
                    x:-1,
                    y:-1
                }
            });
        } else {
            this.setState({
                selected : {
                    x:item_x,
                    y:item_y
                }
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
                                    isSelected={(this.isSelected(item.coordinate.x, item.coordinate.y))}
                                    onClick={() => this.handlePieceSelection(item.coordinate.x, item.coordinate.y)}
                                    value={item}
                                />
                            </div>
                        );
                    })}
                </div>)
        }
    }

    isSelected(item_x, item_y) {
        return (item_x === this.state.selected.x && item_y === this.state.selected.y);
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