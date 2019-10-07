import React from 'react';

import '../index.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

export default class PlayersSection extends React.Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.choosePlayer(this.props.id);
    }

    render() {

        return (
            <Paper className="player" >
                <div className="playerContent">
                    <SentimentVeryDissatisfiedIcon/>
                    <h1 >
                        {this.props.name}
                    </h1>
                </div>
                <Button onClick={this.handleClick} variant="contained" color="primary">
                    Choose this Player
                </Button>
            </Paper>
        );
    }

}
