import React from 'react';
import { getImage } from '../image/Images';

export default class Cell extends React.Component {

    constructor () {
        super();
    }

    render(){
        let className = "";
        if (this.props.value.type === "NONE") {
            className = "cell";
        } else if (this.props.value.type === "LAKE") {
            className = "cell" + " lake";
        } else {
            className = "cellPiece" + (!this.props.isSelected ? "" : " selected");
        }

        className = className + (!this.props.rotate ? "" : " rotate");

        return (
            <div ref="cell" onClick={this.props.onClick} className={className}>
                {getImage(this.props.value, "small", this.props.playerTeam)}
            </div>
        );
    }
}
