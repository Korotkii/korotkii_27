import React from 'react';
import ReactDom from 'react-dom';
import { Clock } from './Clock';
import './AddGame.css';
export class GamePole extends React.Component {
    
    function game() { 
        return (
        <div className="disp">

            <div className="title_game" >
                <h4 className="title_text">Tic tac toe </h4>
            </div>
            
            <div className = "pole">
                <div className="player_name">
                    <div className="first_player">

                    </div>
                    <div className="second_player">
                        
                    </div>
                </div>

                <div className="my-flex-container">
                    <div className="my-flex-block-A1">
                    </div>
                    <div className="my-flex-block-A2">
                    </div>
                    <div className="my-flex-block-A3">
                    </div>
                    <div className="my-flex-block-B1">
                    </div>
                    <div className="my-flex-block-B2">
                    </div>
                    <div className="my-flex-block-B3">
                    </div>
                    <div className="my-flex-block-C1">
                    </div>
                    <div className="my-flex-block-C2">
                    </div>
                    <div className="my-flex-block-C3">
                    </div>          
                </div>
                <div className="time">
                    <Clock/>     
                </div>
                    
                    <div className="button">
                        <button type="button" className="btn btn-primary">Surrender</button>
                    </div>           
            </div>

        </div>        
        
    );
}
// export default game;