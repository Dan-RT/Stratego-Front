import React from 'react';
import { getImage } from '../image/Images';

export default class Cell extends React.Component {

    constructor () {
        super();
    }

    render(){
        let className = "cell" + (!this.props.isSelected ? "" : " selected")
            + (!this.props.isLake ? "" : " lake")
                + (!this.props.rotate ? "" : " rotate");

        return (
            <div ref="cell" onClick={this.props.onClick} className={className}>
                {getImage(this.props.value)}
            </div>
        );
    }
}
