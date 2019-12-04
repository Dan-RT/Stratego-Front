import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Grid from '@material-ui/core/Grid';
import {
    Redirect
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {getCorrectImage} from "../image/Images";

export default class HomePage extends React.Component {

    constructor () {
        super();
        this.handleStartAGame = this.handleStartAGame.bind(this);
        this.state = {
            redirect : false
        };
    }

    handleStartAGame() {
        this.setState({
            redirect: true
        });
    }

    render() {
        return (
            <Grid container spacing={2} direction="row" justify="center">
                <Grid item xs={5}>
                    {
                        this.state.redirect && <Redirect to={{
                            pathname: '/Players'
                        }}
                        />
                    }
                    {
                        !this.state.redirect &&
                        <div>
                            <img src={"../image/stratego-guys"} alt={"stratego-guys"}/>
                            <div>HOME</div>
                            <Grid item className="game-button">
                                <Button variant="contained" color="primary" onClick={this.handleStartAGame}>Start A Game</Button>
                            </Grid>
                        </div>

                    }
                </Grid>
            </Grid>

        );
    }
}