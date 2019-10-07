import React from 'react';
import api from "../utils/api";
import Player from './Player';
import Grid from '@material-ui/core/Grid';
import {
    Route,
    Redirect,
    withRouter
} from "react-router-dom";

export default class PlayersSection extends React.Component {

    constructor () {
        super();
        this.pullPlayers = this.pullPlayers.bind(this);
        this.choosePlayer = this.choosePlayer.bind(this);
        this.state = {
            players : {},
            redirect: false,
            players: {
                current: 0,
                opponent: 0
            }
        };
    }

    pullPlayers() {
        api.get("http://localhost:8080/players").then(data => {
            this.setState({
                players : data
            })
        });
    }

    componentDidMount() {
        this.pullPlayers();
    }

    choosePlayer(id) {
        api.get("http://localhost:8080/player/opponent/" + id).then(data => {
            this.setState({
                players: {
                    current: id,
                    opponent: data
                },
                redirect:true
            })
        });
    }

    render() {

        return (

            <div>
                {
                    this.state.redirect && <Redirect to={{
                                                pathname: '/game',
                                                state: { id: this.state.id }
                                            }}/>
                }
                <Grid container justify="center" alignItems="center" direction="row" spacing={4}>
                    {Object.keys(this.state.players).map(key => {
                        return (
                            <Grid item key={`${key}`} alignItems="center" >
                                <Player id={this.state.players[key]._id} name={this.state.players[key].name} choosePlayer={this.choosePlayer}/>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        )
    }
}