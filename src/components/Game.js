import React from 'react';
import Board from './Board';
import Side from './Side';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Grid from '@material-ui/core/Grid';
import api from '../utils/api.js'
import displayBoard from "../utils/tools";
import Button from '@material-ui/core/Button';

export default class Game extends React.Component {

    constructor () {
        super();
        this.handleGameInit = this.handleGameInit.bind(this);
        this.initGame = this.initGame.bind(this);
        this.pullGame = this.pullGame.bind(this);
        this.queryToBackend = this.queryToBackend.bind(this);
        this.handleTileSelection = this.handleTileSelection.bind(this);
        this.handleCellSelection = this.handleCellSelection.bind(this);
        this.handleGameStart = this.handleGameStart.bind(this);
        this.movePieceOnBoard = this.movePieceOnBoard.bind(this);
        this.state = {
            started : false,
            setup: false,
            tileSelected: {},
            cellSelected: {},
            resetSelection: false,
            PlayerId: 0
        };
    }

    handleGameInit() {
        this.initGame();
        this.setState({
            started : false,
            setup : true
        });
    };

    handleGameStart() {
        this.pullGame();
        this.setState({
            started : true,
            setup : false
        });
    };

    pullGame() {
        api.get("http://localhost:8080/game").then(data => {
            displayBoard(data.board);
            this.setState({
                board : data.board,
                pieces : data.pieces1
            })
        });
    }

    queryToBackend(path, request) {
        return api.post(path, request).then(data => {
            displayBoard(data.board);
            this.setState({
                board : data.board,
                pieces : data.pieces1
            });
        });
    }

    handleTileSelection(item, key, reset) {


        if (reset) {
            this.setState({
                tileSelected: {}
            });
        } else {
            this.setState({
                tileSelected: {
                    tile : item,
                    key : key
                }
            });

            //if (this.state.cellSelected.team !== undefined) {
            if (this.state.cellSelected) {
                console.log("PLACE PIECE");
                this.placePiece(item, this.state.cellSelected);
            }
        }
    }

    handleCellSelection(item, reset) {
        if (reset) {
            this.setState({
                cellSelected: {}
            });

        } else {

            this.setState({
                cellSelected: this.state.board[item.coordinate.x][item.coordinate.y]
            });

            //if (this.state.tileSelected.tile.team !== undefined) {
            if (this.state.tileSelected) {
                console.log("PLACE PIECE");
                this.placePiece(this.state.tileSelected, item);
            }
        }
    }

    movePieceOnBoard(piece, newCoordinate) {
        //debugger;

        let prevCoordinate = piece.coordinate;

        let newPiece = JSON.parse(JSON.stringify(piece));
        newPiece.coordinate = newCoordinate;
        let oldPiece = { type:"NONE", coordinate: prevCoordinate };

        let boardTmp = JSON.parse(JSON.stringify(this.state.board));
        boardTmp[newCoordinate.x][newCoordinate.y] = newPiece;
        boardTmp[prevCoordinate.x][prevCoordinate.y] = oldPiece;

        this.setState({
            board: boardTmp
        });

        displayBoard(this.state.board);
    }

    placePiece (tile, cell) {
        if (tile.tile && cell) {
            tile.tile.coordinate = cell.coordinate;

            let boardTmp = JSON.parse(JSON.stringify(this.state.board));
            let piecesTmp = JSON.parse(JSON.stringify(this.state.pieces));

            if (boardTmp[cell.coordinate.x][cell.coordinate.y].type === "NONE") {
                boardTmp[cell.coordinate.x][cell.coordinate.y] = tile.tile;
                piecesTmp.splice(this.state.tileSelected.key, 1);
            }

            this.setState({
                board: boardTmp,
                pieces: piecesTmp,
                tileSelected: {},
                cellSelected: {}
            });
        }
        displayBoard(this.state.board);
    }

    initGame() {
        api.get("http://localhost:8080/game/initialize").then(data => {
            displayBoard(data.board);
            this.setState({
                board : data.board,
                pieces : data.pieces1,
                PlayerId:this.props.location.state.id
            })
        });
    }

    render() {
        return (
            <Grid container spacing={2} direction="row" justify="center">
                <Grid item xs={3}>
                    <div className="side">
                        {
                            (this.state.started || this.state.setup) &&
                            <Side
                                pieces={this.state.pieces}
                                started={this.state.started}
                                setup={this.state.setup}
                                handleTileSelection={this.handleTileSelection}
                            />
                        }
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <Grid container className="game" direction="column" spacing={2}>
                        <Grid item>
                            <Grid container direction="row" spacing={2}>
                                <Grid item className="game-button">
                                    <Button variant="contained" onClick={this.handleGameInit}>Init</Button>
                                </Grid>
                                <Grid item className="game-button">
                                    <Button variant="contained" color="primary" onClick={this.handleGameStart}>Start</Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        {
                            (this.state.started || this.state.setup) &&
                            <Grid item>
                                <Board
                                    started={this.state.started}
                                    setup={this.state.setup}
                                    board={this.state.board}
                                    queryToBackend={this.queryToBackend}
                                    handleCellSelection={this.handleCellSelection}
                                    movePieceOnBoard={this.movePieceOnBoard}
                                />
                            </Grid>
                        }

                    </Grid>
                </Grid>
            </Grid>


        );
    }
}
