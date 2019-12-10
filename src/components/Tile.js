import React from 'react';
import { getImage } from "../image/Images";


export default class Tile extends React.Component {

    render(){
        let className = "tile" + (!this.props.isSelected ? "" : " selected") ;

        return (
            <div ref="tile" onClick={this.props.onClick} className={className}>
                { getImage(this.props.value, "small", 0) }
            </div>
        );
    }
}