import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Grid from '@material-ui/core/Grid';
import {
    Redirect
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import STRATEGO_TITLE from "../image/stratego.jpg";

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
            <div>
                {
                    this.state.redirect && <Redirect to={{
                        pathname: '/Players'
                    }}
                    />
                }
                {
                    !this.state.redirect &&
                    <Grid container spacing={2} direction="row" justify="center" className={"home-container"}>
                        <div>
                            <hr />
                            <Grid item xs={5}>
                                <img className={"stratego-title"} src={STRATEGO_TITLE} alt={"stratego-guys"}/>
                            </Grid>

                            <Grid item className="game-button">
                                <Button variant="contained" color="primary" onClick={this.handleStartAGame}>Start A Game</Button>
                            </Grid>
                            <hr />
                        </div>
                    </Grid>
                }

            </div>
        );
    }
}