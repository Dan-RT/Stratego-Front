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
        this.initGame = this.initGame.bind(this);
        this.setGame = this.setGame.bind(this);
        this.handleResetGame = this.handleResetGame.bind(this);
        this.postToBackend = this.postToBackend.bind(this);
        this.handleTileSelection = this.handleTileSelection.bind(this);
        this.handleCellSelection = this.handleCellSelection.bind(this);
        this.handleGameReady = this.handleGameReady.bind(this);
        this.movePieceOnBoard = this.movePieceOnBoard.bind(this);
        this.determinePlayerIndex = this.determinePlayerIndex.bind(this);
        this.isYourTurn = this.isYourTurn.bind(this);
        this.state = {
            started : false,
            setup: false,
            tileSelected: {},
            cellSelected: {},
            resetSelection: false,
            player: {},
            game: {},
            gameId: "",
            rotate: false,
            playingPlayer: 0
        };
    }

    handleGameReady() {
        console.log("handleGameReady");
        displayBoard(this.state.game.board);
        this.setGame(JSON.stringify(this.state.game));
    }

    handleResetGame() {
        if(this.state.setup) {
            api.get("/game/reset/" + this.state.gameId).then(data => {
                //console.log(data);
                this.setState({
                    game : data,
                    started: false,
                    setup: true
                })
            });
        }
    }
    
    isYourTurn() {
        if (this.state.playingPlayer === this.state.player.team) {
            return true;
        } else {
            return false;
        }
    }

    determinePlayerIndex(team) {
        return team-1;
    }
    
    setGame(body) {
        api.post("/game/setup", body).then(data => {
            console.log(data);
            displayBoard(data.board);
            this.setState(prevState => ({
                game: {                   // object that we want to update
                    ...prevState.game,    // keep all other key-value pairs
                    board : data.board,   // update the value of specific key
                    player: data.players[this.determinePlayerIndex(this.state.player.team)],
                    playingPlayer: data.playingPlayer
                },
                started : true,
                setup : false
            }))
        });
    }

    postToBackend(path, request) {
        return api.post(path, request).then(data => {
             //console.log(data);
            this.setState(prevState => ({
                game: {                   // object that we want to update
                    ...prevState.game,    // keep all other key-value pairs
                    board : data.board,   // update the value of specific key
                    player: data.players[this.determinePlayerIndex(this.state.player.team)],
                    playingPlayer: data.playingPlayer
                }
            }))
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

            if (this.state.cellSelected.team !== undefined) {
            //if (this.state.cellSelected) {
                 //console.log(this.state.cellSelected);
                 //console.log("PLACE PIECE");
                //debugger;
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
                cellSelected: this.state.game.board[item.coordinate.x][item.coordinate.y]
            });

            if (this.state.tileSelected !== undefined && this.state.tileSelected.tile !== undefined) {
            //if (this.state.tileSelected) {
                 //console.log("PLACE PIECE");
                 //console.log(this.state.tileSelected);
                //debugger;
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

        let boardTmp = JSON.parse(JSON.stringify(this.state.game.board));
        boardTmp[newCoordinate.x][newCoordinate.y] = newPiece;
        boardTmp[prevCoordinate.x][prevCoordinate.y] = oldPiece;

        this.setState(prevState => ({
            game: {                   // object that we want to update
                ...prevState.game,    // keep all other key-value pairs
                board : boardTmp     // update the value of specific key
            }
        }));

        //displayBoard(this.state.game.board);
    }

    placePiece (tile, cell) {
        //debugger;
        if (tile.tile && cell) {
            tile.tile.coordinate = cell.coordinate;

             //console.log("this.state.player.pieces");
             //console.log(this.state.player.pieces);
            let boardTmp = JSON.parse(JSON.stringify(this.state.game.board));
            let piecesTmp = JSON.parse(JSON.stringify(this.state.player.pieces));

            if (boardTmp[cell.coordinate.x][cell.coordinate.y].type === "NONE") {
                boardTmp[cell.coordinate.x][cell.coordinate.y] = tile.tile;
                piecesTmp.splice(this.state.tileSelected.key, 1);
            }

             //console.log("piecesTmp");
             //console.log(piecesTmp);

            this.setState(prevState => ({
                game: {                   // object that we want to update
                    ...prevState.game,    // keep all other key-value pairs
                    board : boardTmp     // update the value of specific key
                },
                player: {
                    ...prevState.player,
                    pieces : piecesTmp
                },
                tileSelected: {},
                cellSelected: {}
            }));

        }
        //displayBoard(this.state.game.board);
    }
    
    initGame() {
        this.setState({
            game : this.props.location.state.game,
            gameId: this.props.location.state.game._id,
            player: this.props.location.state.player,
            opponent: this.props.location.state.opponent,
            started : false,
            setup : true,
            rotate: (this.props.location.state.player.team === 2)
        });
    }

    componentDidMount() {

        this.initGame();
        //console.log("componentDidMount");
        let id = "";

        try {
            setInterval(async () => {
                //console.log("State");
                //console.log(this.state);
                //console.log(this.state.game);
                //console.log(this.state.game._id);
                id = this.state.game._id;

                if (this.state.started) {

                    //console.log("componentDidMount / game started");
                    api.get("/game/" + id).then(data => {
                        //console.log(data);
                        try{
                            this.setState({
                                game : data,
                                player: data.players[this.determinePlayerIndex(this.state.player.team)],
                                playingPlayer: data.playingPlayer
                            })
                        } catch (e) {
                            console.log(e)
                        }
                    });


                }

            }, 3000);

        } catch(e) {
            //console.log(e);
        }
    }

    render() {
        return (
            <Grid container spacing={2} direction="row" justify="center">
                <Grid item xs={3}>

                    <div className="side">

                        {/*<input onClick={this.rotate} type="button" value="Rotate" />*/}
                        {
                            <Side
                                pieces={this.state.player.pieces}
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
                                    <Button variant="contained" onClick={this.handleResetGame}>Reset</Button>
                                </Grid>
                                {
                                    this.state.setup &&
                                    <Grid item className="game-button">
                                        <Button variant="contained" color="primary" onClick={this.handleGameReady}>Ready</Button>
                                    </Grid>
                                }
                                <Grid item className="playingPlayer">
                                    { this.isYourTurn() && this.state.started && <div>Your Turn</div> }
                                    { !this.isYourTurn() && this.state.started && <div>Not your Turn</div> }
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                            (this.state.started || this.state.setup) &&
                            <Grid item style={{"maxHeight": '70vh'}}>
                                <div className={this.state.rotate && "rotateBoard"}>
                                    <Board
                                        gameId={this.state.game._id}
                                        rotate={this.state.rotate}
                                        started={this.state.started}
                                        setup={this.state.setup}
                                        player={this.state.player}
                                        opponent={this.state.opponent}
                                        board={this.state.game.board}
                                        postToBackend={this.postToBackend}
                                        handleCellSelection={this.handleCellSelection}
                                        movePieceOnBoard={this.movePieceOnBoard}
                                        isYourTurn={this.isYourTurn()}
                                    />
                                </div>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>


        );
    }
}