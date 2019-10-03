import React from 'react';
import getCorrectImage from '../image/Images';

export default class Cell extends React.Component {

    constructor () {
        super();
        this.getImage = this.getImage.bind(this);
    }

    getImage(value) {

        let color = "";

        if (value.team === 1) {
            color = "_R";
        } else if (value.team === 2) {
            color = "_B";
        } else {
            console.log("ERROR ON Cell.getImage");
            return "";
        }

        let nameImage = value.type + color;

        return <img src={getCorrectImage(nameImage)} alt={nameImage} className="PieceImage"/>;

    }

    render(){
        let className = "cell" + (!this.props.isSelected ? "" : " selected") + (!this.props.isLake ? "" : " lake") ;

        return (
            <div ref="cell" onClick={this.props.onClick} className={className}>
                {this.getImage(this.props.value)}
            </div>
        );
    }
}
