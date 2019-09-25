import React from 'react';

export default class Cell extends React.Component {

    constructor () {
        super();
        this.getValue = this.getValue.bind(this);
        this.state = {
            isLake : false
        };
    }

    getValue(){
        // Todo to change
        if (this.props.value === "NONE") {
            return "";
        } else if (this.props.value === -2 || this.props.value === "") {
            return "";
        } else {
            return this.props.value;
        }
    }

    render(){
        let className = "cell" + (!this.props.isSelected ? "" : " selected") + (!this.props.isLake ? "" : " lake") ;

        return (
            <div ref="cell" onClick={this.props.onClick} className={className}>
                {this.getValue()}
            </div>
        );
    }
}
