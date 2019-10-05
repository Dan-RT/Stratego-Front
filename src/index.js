import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import Side from './components/Side';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Grid from '@material-ui/core/Grid';
import api from './utils/api.js'
import displayBoard from "./utils/tools";

class Game extends React.Component {

    constructor () {
        super();
        this.handleGameStart = this.handleGameStart.bind(this);
        this.initGame = this.initGame.bind(this);
        this.pullGame = this.pullGame.bind(this);
        this.queryToBackend = this.queryToBackend.bind(this);
        this.state = {
            started : false
        };
    }

    handleGameStart() {
        this.pullGame();
        this.setState({
            started : true
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
                {<Grid item xs={3}>
                    <div className="side">
                        { this.state.started && <Side pieces={this.state.pieces}/> }
                    </div>
                </Grid>}
                <Grid item xs={5}>
                    <Grid container className="game" direction="column">
                        <Grid item className="game-info">
                            <button onClick={this.handleGameStart}>Start</button>
                        </Grid>
                        { this.state.started &&
                            <Grid item >
                                <Board board={this.state.board} queryToBackend={this.queryToBackend}/>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>


        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));
