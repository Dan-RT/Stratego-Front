import React from 'react';
import Cell from './Cell';
import api from "../utils/api";

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
        console.log("initGame");
        api.get("http://localhost:8080/game/initialize").then(data => {
            this.setState({
                board : data.board.board
            })
        });
    }

    pullGame() {
        api.get("http://localhost:8080/game").then(data => {
            this.setState({
                board : data.board.board
            })
        });
    }

    renderBoard(board) {
        if (board) {
            console.log("renderBoard")
            console.log("board", board);

            return (
                <div>
                    {Object.keys(board).map(keyOuter => {
                        return Object.keys(board[keyOuter]).map(keyInner => {
                            let item = board[keyOuter][keyInner];
                            return (
                                <div key={`${keyInner}-${keyOuter}`}>
                                    <Cell
                                        isSelected={(this.isSelected(item.coordinate.y, item.coordinate.x))}
                                        value={item.type}
                                        onClick={() => this.handleCellSelection(item.coordinate.y, item.coordinate.x)}
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
        console.log("To select: x: " + item_x + " and y: " + item_y);

        if (this.isSelected(item_x, item_y)) {
            this.setState({
                selected : {
                    x:-1,
                    y:-1
                }
            });
        } else {

            console.log(this.state.board[item_x][item_y].type);

            // Si on selectionne un endroit vide ca marche pas apres avoir selectionné une piece:
                // demander autorisation
                // changer de place la piece

            if (this.isPiece(this.state.selected.x, this.state.selected.y) && this.isEmpty(item_x, item_y))  {
                //si le precedent est une piece et le current vide
                this.state.board[item_x][item_y].type = this.state.board[this.state.selected.x][this.state.selected.y].type;
                this.state.board[this.state.selected.x][this.state.selected.y].type = "NONE";
            }


            if (this.isLake() || this.isEmpty()) {
                return;
            }

            this.setState({
                selected : {
                    x:item_x,
                    y:item_y
                }
            });

        }
        console.log("Selected : x: " + this.state.selected.x + " and y: " + this.state.selected.y);
    }

    isLake(item_x, item_y) {
        if (item_x === -1 || item_y === -1) {
            return false;
        }
        return (this.state.board[item_x][item_y].type === "LAKE");
    }

    isEmpty(item_x, item_y) {
        if (item_x === -1 || item_y === -1) {
            return false;
        }
        return (this.state.board[item_x][item_y].type === "NONE");
    }

    isPiece(item_x, item_y) {
        console.log("test : x: " + item_x + " and y: " + item_y);
        console.log(this.state.board);
        if (item_x === -1 || item_y === -1) {
            return false;
        }
        return (!this.state.board[item_x][item_y].type === "NONE" && !this.state.board[item_x][item_y].type === "LAKE");
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
        console.log("componentWillMount");
        this.manageData();
    }

    componentWillReceiveProps() {
        console.log("componentWillReceiveProps");
        this.manageData();
    }

    render() {
        console.log(this.props);
        console.log("board.render()");
        return (
            <div className="board">
                {
                    this.renderBoard(this.state.board)
                }
            </div>
        );
    }
}
