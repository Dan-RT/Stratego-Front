import React from 'react';
import Cell from './Cell';

export default class Board extends React.Component {

    constructor () {
        super();
        this.renderBoard = this.renderBoard.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.isOpponent = this.isOpponent.bind(this);
        this.handleCellSelectionStarted = this.handleCellSelectionStarted.bind(this);
        this.handleCellSelectionSetup = this.handleCellSelectionSetup.bind(this);
        this.state = {
            selected : {
                x:-1,
                y:-1
            }
        };
    }

    renderBoard(board) {
        if (board) {

            return (
                <div>
                    {Object.keys(board).map(keyOuter => {
                        return Object.keys(board[keyOuter]).map(keyInner => {
                            let item = board[keyInner][keyOuter];
                            return (
                                <div key={`${keyInner}-${keyOuter}`}>
                                    <Cell
                                        isSelected={(this.isSelected(item.coordinate.x, item.coordinate.y))}
                                        value={item}
                                        team={item.team}
                                        onClick={
                                            () => {
                                                if(this.props.started && !this.props.setup) {
                                                    this.handleCellSelectionStarted(item.coordinate.x, item.coordinate.y)
                                                } else if (!this.props.started && this.props.setup) {
                                                    this.handleCellSelectionSetup(item.coordinate.x, item.coordinate.y)
                                                }
                                            }
                                        }
                                        isLake={(item.type === "LAKE")}
                                    />
                                </div>
                            );
                        });
                    })}
                </div>)
        }

    }

    handleCellSelectionSetup(item_x, item_y) {

        console.log(item_x);
        console.log(item_y);

        console.log(this.state.selected);

        if (this.isSelected(item_x, item_y)) {
            this.setState({
                selected : {
                    x : -1,
                    y : -1
                }
            });
            this.props.handleCellSelection(this.props.board[item_x][item_y], true);

        } else {

            let current = this.props.board[item_x][item_y];
            let previous = {};

            if (this.state.selected.x >= 0 && this.state.selected.y >= 0) {
                previous = this.props.board[this.state.selected.x][this.state.selected.y];

                if (this.isPiece(previous) && this.isEmpty(current)) {
                    this.props.movePieceOnBoard(previous, current.coordinate);

                    this.setState({
                        selected : {
                            x : -1,
                            y : -1
                        }
                    });
                    return;
                }

            }

            this.setState({
                selected : {
                    x : item_x,
                    y : item_y
                }
            });

            this.props.handleCellSelection(this.props.board[item_x][item_y], false);

            setTimeout(
                function() {
                    this.setState({
                        selected : {
                            x : -1,
                            y : -1
                        }
                    });
                }.bind(this),
                1500
            );

        }

        /* let current = this.props.board[item_x][item_y];
        let previous = 0;
        console.log("Selected x: " + this.state.selected.x + " y: " + this.state.selected.y);

        if (this.state.selected.x >= 0 && this.state.selected.y >= 0) {
            previous = this.props.board[this.state.selected.x][this.state.selected.y];

            if (this.isSelected(current.coordinate.item_x, current.coordinate.item_y)) {
                this.setState({
                    selected : {
                        x:-1,
                        y:-1
                    }
                });
                return;
            }

            if (this.isEmpty(current)) {
                //if (this.props.tileSelected.)
            }

        }

        console.log("handleCellSelectionSetup");

        if (this.isEmpty(current)) {
            //if (this.props.tileSelected.)
        } else {
            this.setState({
                selected: {
                    x:item_x,
                    y:item_y
                }
            })
        } */
    }

    handleCellSelectionStarted(item_x, item_y) {

        let current = this.props.board[item_x][item_y];
        console.log("Current:");
        console.log(current);

        if (this.isLake(item_x, item_y)) {
            return;
        }

        let previous = 0;

        if (this.state.selected.x >= 0 && this.state.selected.y >= 0) {
            // if we have a selected piece

            previous = this.props.board[this.state.selected.x][this.state.selected.y];
            console.log("previous:");
            console.log(previous);

            if (this.isSelected(current.coordinate.x, current.coordinate.y)) {
                // if we click on the same piece, we unselect it
                this.setState({
                    selected : {
                        x:-1,
                        y:-1
                    }
                });
                return;
            } else if (this.isPiece(previous))  {
                    // if previous is empty
                    
                    if (this.isEmpty(current)) {
                        // if current is a piece

                        let board = this.props.board;
                        let pieceToMove = this.props.board[this.state.selected.x][this.state.selected.y];
                        let action = this.props.board[item_x][item_y].coordinate;

                        let request = JSON.stringify({board, pieceToMove, action});
                        this.props.queryToBackend("http://localhost:8080/turn", request).then(() => {
                            this.setState({
                                selected : {
                                    x:-1,
                                    y:-1
                                }
                            });
                        });

                        return;
                    }

                    if (this.isOpponent(previous, current) && this.isOpponent(previous, current)) {

                        let board = this.props.board;
                        let pieceAttacking = previous;
                        let pieceAttacked = current;

                        let request = JSON.stringify({board, pieceAttacking, pieceAttacked});

                        this.props.queryToBackend("http://localhost:8080/attack", request).then(() => {
                            this.setState({
                                selected : {
                                    x:-1,
                                    y:-1
                                }
                            });
                        });

                        return;
                    }

                }
            }

        if (this.isPiece(current)) {
            // if current is a piece, select current

            console.log(current);
            this.setState({
                selected : {
                    x: current.coordinate.x,
                    y: current.coordinate.y
                }
            });
            return;
        }

        this.setState({
            selected: {
                x: -1,
                y: -1
            }
        });
    }

    isLake(item_x, item_y) {
        if (item_x === -1 || item_y === -1) {
            return false;
        }
        return (this.props.board[item_x][item_y].type === "LAKE");
    }

    isEmpty(item) {
        if (item.x === -1 || item.y === -1) {
            return false;
        }
        console.log("isEmpty");
        console.log(item.type);
        return (item.type === "NONE");
    }

    isPiece(item) {
        if (item.x === -1 || item.y === -1) {
            return false;
        }
        console.log("isPiece");
        console.log(item.type);
        return (item.type !== "NONE" && !item.type !== "LAKE");
    }

    isSelected(item_x, item_y) {
        return (item_x === this.state.selected.x && item_y === this.state.selected.y);
    }

    isOpponent(currentPiece, targetedPiece) {
        return (currentPiece.team !== targetedPiece.team)
    }

    render() {
        return (
            <div className="board">
                {
                    this.renderBoard(this.props.board)
                }
            </div>
        );
    }
}
