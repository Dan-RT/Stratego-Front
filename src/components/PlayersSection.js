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
            player : {},
            opponent : {},
            game: {},
            redirect: false
        };
    }

    pullPlayers() {
         //console.log("pullPlayers");
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
                game:data
            });
            for (let i = 0; i < data.players.length; i++) {
                if (id === data.players[i]._id) {
                    this.setState({
                        player:data.players[i]
                    });
                } else {
                    this.setState({
                        opponent:data.players[i]
                    });
                }
            }
        }).then(() => {
             //console.log(this.state);
            this.setState({
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
                                                state: {
                                                    game: this.state.game,
                                                    player: this.state.player,
                                                    opponent: this.state.opponent
                                                }
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