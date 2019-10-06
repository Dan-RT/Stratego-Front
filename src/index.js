import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import Side from './components/Side';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Grid from '@material-ui/core/Grid';
import api from './utils/api.js'
import displayBoard from "./utils/tools";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

class Game extends React.Component {

    constructor () {
        super();
        this.handleGameInit = this.handleGameInit.bind(this);
        this.initGame = this.initGame.bind(this);
        this.pullGame = this.pullGame.bind(this);
        this.queryToBackend = this.queryToBackend.bind(this);
        this.handleGameStart = this.handleGameStart.bind(this);
        this.state = {
            started : false,
            setup: false
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

    initGame() {
        api.get("http://localhost:8080/game/initialize").then(data => {
            displayBoard(data.board);
            this.setState({
                board : data.board,
                pieces : data.pieces1
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
                                />
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>


        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));
