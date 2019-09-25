import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { Container, Row, Col } from 'reactstrap';

class Game extends React.Component {

    /*
    Beginner: 10 mines, 8x8 board
    Intermediate: 20 mines, 12x12 board
    Expert: 40 mines, 16x16 board
    */
    state = {
        height: 10,
        width: 10,
        mines: 10,
    };

    handleGameStart = () => {
        let difficulty = document.querySelector("#level_select");
        if (difficulty.value === "beginner") {
            this.setState({
                height: 10,
                width: 10,
                mines: 10,
            });
        }
        if (difficulty.value === "intermediate") {
            this.setState({
              height: 10,
              width: 10,
              mines: 10,
            });
        }
        if (difficulty.value === "expert") {
            this.setState({
              height: 10,
              width: 10,
              mines: 10,
            });
        }
    }

    render() {
        const { height, width, mines } = this.state;
        return (

            <div className="game">
              <Container>
                <Row>
                  <Col sm={{ size: 6, offset: 4 }}>
                    <div className="game-info">
                        <h4>Select a level a click "start"</h4>
                        <span className="info">Level:
                            <select id="level_select">
                                <option value="beginner"> Beginner </option>
                                <option value="intermediate"> Intermediate </option>
                                <option value="expert"> Expert </option>
                            </select>
                        </span>
                        <button onClick={this.handleGameStart}>Start</button>
                    </div>
                    <Board height={height} width={width} mines={mines} />
                  </Col>
                  <Col sm={3}>
                  </Col>
                </Row>
              </Container>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));
