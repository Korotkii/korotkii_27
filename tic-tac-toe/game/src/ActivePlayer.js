import React from 'react';
import ReactDom from 'react-dom';
import cross from "./cross.png";
import zero from "./zero.png";
import './Add_Game.css';

export default class ActivePlayer extends React.Component{

    render(){
        return(
            <div className="my-flex-block-A2">
                <div >{this.props.activePlayer1.id}</div>
                {/* <img src={cross}  height="100px" width="100px"/> */}
            </div>
        );


    }







}