import React from 'react';
import { getImage } from '../image/Images';

export default class Cell extends React.Component {

    constructor () {
        super();
    }

    componentDidMount() {
        console.log("Props cell");
        console.log(this.props);
    }

    render(){
        let className = "cell" + (!this.props.isSelected ? "" : " selected")
            + (!this.props.isLake ? "" : " lake")
                + (!this.props.rotate ? "" : " rotate");

        return (
            <div ref="cell" onClick={this.props.onClick} className={className}>
                {getImage(this.props.value, "small", this.props.playerTeam)}
            </div>
        );
    }
}
