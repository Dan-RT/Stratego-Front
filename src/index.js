import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
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
                board : data.board
            })
        });
    }

    queryToBackend(path, request) {
        return api.post(path, request).then(data => {
            displayBoard(data.board);
            this.setState({
                board : data.board
            });
        });
    }

    initGame() {
        api.get("http://localhost:8080/game/initialize").then(data => {
            displayBoard(data.board);
            this.setState({
                board : data.board
            })
        });
    }

    componentWillMount() {
        //this.initGame();
    }

    render() {
        return (

            <Grid container  spacing={2}>
                <Grid item xs={12}>

                </Grid>
                <Grid item xs={12}>
                    <div className="game">
                        <div className="game-info">
                            <button onClick={this.handleGameStart}>Start</button>
                        </div>
                        { this.state.started && <Board board={this.state.board} queryToBackend={this.queryToBackend}/>}
                    </div>
                </Grid>
            </Grid>


        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));
