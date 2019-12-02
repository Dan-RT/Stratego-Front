import React from 'react';
import Cell from './Cell';
import Grid from '@material-ui/core/Grid';
import '../index.css';
import Modal from 'react-modal';

import { getImage } from '../image/Images';

Modal.setAppElement(document.getElementById('root'));

export default class Board extends React.Component {

    constructor () {
        super();
        this.renderBoard = this.renderBoard.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.isOpponent = this.isOpponent.bind(this);
        this.handleCellSelectionStarted = this.handleCellSelectionStarted.bind(this);
        this.handleCellSelectionSetup = this.handleCellSelectionSetup.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {
            selected : {
                x:-1,
                y:-1
            },
            modalIsOpen: false,
            pieceAttacking: {},
            pieceAttacked: {}
        };
    }

    openModal() {
        this.setState({modalIsOpen: true});
        setTimeout(
            function() {
                this.setState({
                    modalIsOpen: false,
                    pieceAttacking: {},
                    pieceAttacked: {}
                });
            }.bind(this),
            5000
        );
    }

    closeModal() {
        this.setState({modalIsOpen: false});
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
                                        rotate={this.props.rotate}
                                        isSelected={(this.isSelected(item.coordinate.x, item.coordinate.y))}
                                        value={item}
                                        team={item.team}
                                        playerTeam={this.props.player.team}
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

         //console.log(item_x);
         //console.log(item_y);

         //console.log(this.state.selected);

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
                500
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

        if (!this.props.yourTurn) {
            return;
        }

        let current = this.props.board[item_x][item_y];
         //console.log("Current:");
         //console.log(current);

        if (this.isLake(item_x, item_y)) {
            return;
        }

        let previous = 0;

        if (this.state.selected.x >= 0 && this.state.selected.y >= 0) {
            // if we have a selected piece

            previous = this.props.board[this.state.selected.x][this.state.selected.y];
             //console.log("previous:");
             //console.log(previous);

            //debugger;

            if (this.isSelected(current.coordinate.x, current.coordinate.y)) {
                // if we click on the same piece, we unselect it
                //debugger;
                this.setState({
                    selected : {
                        x:-1,
                        y:-1
                    }
                });
                return;
            } else if (this.isPiece(previous))  {
                //debugger;

                // if previous is empty
                if (this.isEmpty(current)) {

                    let gameId = this.props.gameId;
                    let board = this.props.board;
                    let pieceToMove = this.props.board[this.state.selected.x][this.state.selected.y];
                    let action = this.props.board[item_x][item_y].coordinate;

                    let request = JSON.stringify({gameId, board, pieceToMove, action});

                    this.props.postToBackend("http://localhost:8080/turn", request).then(() => {
                        this.setState({
                            selected : {
                                x:-1,
                                y:-1
                            }
                        });
                    });

                    return;
                }

                if (this.isOpponent(current)) {

                    let board = this.props.board;
                    let gameId = this.props.gameId;
                    this.setState({
                        pieceAttacking: previous,
                        pieceAttacked: current
                    });
                    let pieceAttacking = previous;
                    let pieceAttacked = current;
                    let playerAttacking = this.props.player;
                    let playerAttacked = this.props.opponent;

                    let request = JSON.stringify({gameId, board, pieceAttacking, pieceAttacked, playerAttacking, playerAttacked});

                    this.props.postToBackend("http://localhost:8080/attack", request).then(() => {
                        this.setState({
                            selected : {
                                x:-1,
                                y:-1
                            }
                        });
                    });

                    this.openModal();

                    return;
                }

                if (this.isEmpty(current)) {
                    // if current is a piece

                    let board = this.props.board;
                    let pieceToMove = this.props.board[this.state.selected.x][this.state.selected.y];
                    let action = this.props.board[item_x][item_y].coordinate;

                    let request = JSON.stringify({board, pieceToMove, action});
                    this.props.postToBackend("http://localhost:8080/turn", request).then(() => {
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

        if (this.isPiece(current) && !this.isOpponent(current)) {
            // if current is a piece, select current

             //console.log(current);
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
         //console.log("isEmpty");
         //console.log(item.type);
        return (item.type === "NONE");
    }

    isPiece(item) {
         //console.log("isPiece");
         //console.log(item);
        if (item.x === -1 || item.y === -1) {
            return false;
        }
         //console.log("isPiece");
         //console.log(item.type);
        return (item.type !== "NONE" && !item.type !== "LAKE");
    }

    isSelected(item_x, item_y) {
        return (item_x === this.state.selected.x && item_y === this.state.selected.y);
    }

    isOpponent(targetedPiece) {
        return (this.props.player.team !== targetedPiece.team)
    }

    render() {
        return (
            <div>
                <div className="board">
                    {
                        this.renderBoard(this.props.board)
                    }
                </div>
                <Modal
                    style={{ position: 'absolute' }}
                    className="modalCustom"
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                >
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={10}
                        className={"modalContent"}
                    >
                        <Grid item xs={6}>
                            {getImage(this.state.pieceAttacking, "big", 0)}
                        </Grid>

                        <Grid item xs={6}>
                            {getImage(this.state.pieceAttacked, "big", 0)}
                        </Grid>

                    </Grid>
                </Modal>
            </div>
        );
    }
}
