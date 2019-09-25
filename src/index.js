import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import api from './utils/api.js'
import { Container, Row, Col } from 'reactstrap';

class Game extends React.Component {

    constructor () {
        super();
        this.handleGameStart = this.handleGameStart.bind(this);
        this.state = {
            started : false
        };
    }

    handleGameStart() {
        console.log("handleGameStart");
        this.setState({
            started : true
        });
    };

    render() {
        return (

            <div className="game">
                <div className="game-info">
                    <button onClick={this.handleGameStart}>Start</button>
                </div>
                <Board started={this.state.started}/>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));
