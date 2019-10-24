import React from 'react';
import { getImage } from "../image/Images";


export default class Tile extends React.Component {

    render(){
        let className = "cell" + (!this.props.isSelected ? "" : " selected") ;

        return (
            <div ref="cell" onClick={this.props.onClick} className={className}>
                { getImage(this.props.value, "small") }
            </div>
        );
    }
}