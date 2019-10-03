import React from 'react';
import Cell from './Cell';
import api from "../utils/api";
import displayBoard from "../utils/tools";


export default class Board extends React.Component {

    constructor () {
        super();
        this.initGame = this.initGame.bind(this);
        this.pullGame = this.pullGame.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this.manageData = this.manageData.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.handleCellSelection = this.handleCellSelection.bind(this);

        this.state = {
            selected : {
                x:-1,
                y:-1
            }
        };
    }

    initGame() {
        ////console.log("initGame");
        api.get("http://localhost:8080/game/initialize").then(data => {
            displayBoard(data.board);
            this.setState({
                board : data.board
            })
        });
    }

    pullGame() {
        api.get("http://localhost:8080/game").then(data => {
            displayBoard(data.board);
            this.setState({
                board : data.board
            })
        });
    }

    renderBoard(board) {
        if (board) {
            ////console.log("renderBoard")
            ////console.log("board", board);

            return (
                <div>
                    {Object.keys(board).map(keyOuter => {
                        return Object.keys(board[keyOuter]).map(keyInner => {
                            let item = board[keyOuter][keyInner];
                            return (
                                <div key={`${keyOuter}-${keyInner}`}>
                                    <Cell
                                        isSelected={(this.isSelected(keyOuter, keyInner))}
                                        value={item.type}
                                        team={item.team}
                                        onClick={() => this.handleCellSelection(keyOuter, keyInner)}
                                        isLake={(item.type === "LAKE")}
                                    />
                                </div>
                            );
                        });
                    })}
                </div>)
        }

    }

    handleCellSelection(item_x, item_y) {
        console.log("Selected : x: " + this.state.selected.x + " and y: " + this.state.selected.y);
        if (this.state.selected.x >= 0 && this.state.selected.y >= 0) {
            console.log(this.state.board[this.state.selected.x][this.state.selected.y]);
        }
        console.log("To select: x: " + item_x + " and y: " + item_y);
        if (item_x >= 0 && item_y >= 0) {
            console.log(this.state.board[item_x][item_y]);
        }

        if (this.isSelected(item_x, item_y)) {
            this.setState({
                selected : {
                    x:-1,
                    y:-1
                }
            });
        } else {

            ////console.log(this.state.board[item_x][item_y].type);

            // Si on selectionne un endroit vide ca marche pas apres avoir selectionné une piece:
                // demander autorisation
                // changer de place la piece

            let empty = this.isEmpty(item_x, item_y);
            console.log("empty current", empty);

            let piece = this.isPiece(this.state.selected.x, this.state.selected.y);
            console.log("piece before", piece);

            if (empty) {
                if (piece)  {
                    //si le precedent est une piece et le current vide
                    console.log("GOOOOOOOO");

                    /*this.state.board[item_x][item_y] = this.state.board[this.state.selected.x][this.state.selected.y];
                    this.state.board[item_x][item_y].coordinate.x = item_x;
                    this.state.board[item_x][item_y].coordinate.y = item_y;
                    console.log(this.state.board[item_x][item_y]);*/

                    let board = this.state.board;
                    let pieceToMove = this.state.board[this.state.selected.x][this.state.selected.y];
                    console.log("pieceToMove");
                    pieceToMove
                    let action = this.state.board[item_x][item_y].coordinate;
                    console.log("Action");


                    let request = JSON.stringify({board, pieceToMove, action});
                    api.post("http://localhost:8080/turn", request).then(data => {
                        if (data.authorized) {
                            displayBoard(data.board);
                            this.setState({
                                board : data.board,
                                selected : {
                                    x:-1,
                                    y:-1
                                }
                            });
                        } else {
                            this.setState({
                                selected : {
                                    x:-1,
                                    y:-1
                                }
                            });
                            alert("Bro you can't play that.");
                        }
                    }).then(() => {
                        //console.log(this.state.board[6][9]);
                    });

                    console.log("Board");
                    //displayBoard(this.state.board);

                    return;
                }
            }

            if (this.isLake(item_x, item_y) || this.isEmpty(item_x, item_y)) {
                return;
            }

            this.setState({
                selected : {
                    x:item_x,
                    y:item_y
                }
            });


            console.log("Board");
            //displayBoard(this.state.board);
        }
    }

    isLake(item_x, item_y) {
        if (item_x === -1 || item_y === -1) {
            return false;
        }
        return (this.state.board[item_x][item_y].type === "LAKE");
    }

    isEmpty(item_x, item_y) {
        if (item_x === -1 || item_y === -1) {
            //console.log("-1");
            return false;
        }
        console.log("isEmpty");
        console.log(this.state.board[item_x][item_y].type);
        return (this.state.board[item_x][item_y].type === "NONE");
    }

    isPiece(item_x, item_y) {
        ////console.log("test : x: " + item_x + " and y: " + item_y);
        ////console.log(this.state.board);
        if (item_x === -1 || item_y === -1) {
            //console.log("-1");
            return false;
        }
        console.log("isPiece");
        console.log(this.state.board[item_x][item_y].type);
        return (this.state.board[item_x][item_y].type !== "NONE" && !this.state.board[item_x][item_y].type !== "LAKE");
    }

    isSelected(item_x, item_y) {
        return (item_x === this.state.selected.x && item_y === this.state.selected.y);
    }

    manageData() {
        if (!this.props.started) {
            this.setState({
                board: this.initGame()
            })
        } else {
            this.pullGame();
        }
    }

    componentWillMount() {
        ////console.log("componentWillMount");
        this.manageData();
    }

    componentWillReceiveProps() {
        ////console.log("componentWillReceiveProps");
        this.manageData();
    }

    render() {
        ////console.log(this.props);
        ////console.log("board.render()");
        return (
            <div className="board">
                {
                    this.renderBoard(this.state.board)
                }
            </div>
        );
    }
}
