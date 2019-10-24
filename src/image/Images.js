import React from 'react';

import SPY_B from "../image//BLEU/1_bleu.jpg";
import SCOUT_B from "../image//BLEU/2_bleu.jpg";
import MINER_B from "../image//BLEU/3_bleu.jpg";
import SERGEANT_B from "../image//BLEU/4_bleu.jpg";
import LIEUTENANT_B from "../image//BLEU/5_bleu.jpg";
import CAPTAIN_B from "../image//BLEU/6_bleu.jpg";
import MAJOR_B from "../image//BLEU/7_bleu.jpg";
import COLONEL_B from "../image//BLEU/8_bleu.jpg";
import GENERAL_B from "../image//BLEU/9_bleu.jpg";
import MARSHAL_B from "../image//BLEU/10_bleu.jpg";
import BOMB_B from "../image//BLEU/bombe_bleu.jpg";
import FLAG_B from "../image//BLEU/drapeau_bleu.jpg";

import SPY_R from "../image//ROUGE/1_rouge.jpg";
import SCOUT_R from "../image//ROUGE/2_rouge.jpg";
import MINER_R from "../image//ROUGE/3_rouge.jpg";
import SERGEANT_R from "../image//ROUGE/4_rouge.jpg";
import LIEUTENANT_R from "../image//ROUGE/5_rouge.jpg";
import CAPTAIN_R from "../image//ROUGE/6_rouge.jpg";
import MAJOR_R from "../image//ROUGE/7_rouge.jpg";
import COLONEL_R from "../image//ROUGE/8_rouge.jpg";
import GENERAL_R from "../image//ROUGE/9_rouge.jpg";
import MARSHAL_R from "../image//ROUGE/10_rouge.jpg";
import BOMB_R from "../image//ROUGE/bombe_rouge.jpg";
import FLAG_R from "../image//ROUGE/drapeau_rouge.jpg";


export function getCorrectImage(item) {
    switch (item) {
        case "SPY_R":
            return SPY_R;
        case "SCOUT_R":
            return SCOUT_R;
        case "SPY_R":
            return SPY_R;
        case "MINER_R":
            return MINER_R;
        case "LIEUTENANT_R":
            return LIEUTENANT_R;
        case "SERGEANT_R":
            return SERGEANT_R;
        case "CAPTAIN_R":
            return CAPTAIN_R;
        case "MAJOR_R":
            return MAJOR_R;
        case "COLONEL_R":
            return COLONEL_R;
        case "GENERAL_R":
            return GENERAL_R;
        case "MARSHAL_R":
            return MARSHAL_R;
        case "BOMB_R":
            return BOMB_R;
        case "FLAG_R":
            return FLAG_R;
        case "SCOUT_B":
            return SCOUT_B;
        case "SPY_B":
            return SPY_B;
        case "MINER_B":
            return MINER_B;
        case "LIEUTENANT_B":
            return LIEUTENANT_B;
        case "SERGEANT_B":
            return SERGEANT_B;
        case "CAPTAIN_B":
            return CAPTAIN_B;
        case "MAJOR_B":
            return MAJOR_B;
        case "COLONEL_B":
            return COLONEL_B;
        case "GENERAL_B":
            return GENERAL_B;
        case "MARSHAL_B":
            return MARSHAL_B;
        case "BOMB_B":
            return BOMB_B;
        case "FLAG_B":
            return FLAG_B;
        default:
            return "";
    }
}

export function getImage(value, size) {

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

    let style = "";

    if (size === "big") {
        style = "PieceImageBig"
    } else {
        style = "PieceImage"
    }

    return <img src={getCorrectImage(nameImage)} alt={nameImage} className={style}/>;

}
