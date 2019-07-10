import React from 'react';
import ReactDom from 'react-dom';
import { Timer } from './Timer';
import './AddGame.css';

export class GamePole extends React.Component {
    
    render() { 
        // let games = localStorage.get("games");
        // { field: [[1, 0, ], [0, , ], [ , , ]]}
        // for (i) {
        //     for(j) {
                    // <Cell class="my-flex-block-"+i+j onClick={clickcell.bind(this, i,j)}/>
        //     }
        // }
        return (
            <div className="disp">

            <div className="title_game" >
                <h4 className="title_text">Tic tac toe </h4>
            </div>
            
            <div className = "pole">
                <div className="player_name">
                    <div className="first_player">
                        <div className="name_1">
                            <h4>"Player 1"</h4>
                        </div>
                    </div>
                    <div className="second_player">
                        <div className="name_2">
                            <h4>"Player 2"</h4>
                        </div>
                    </div>
            </div>

                <div className="my-flex-container">
                    <div className="my-flex-block-A1"  onClick={cellclick} >
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
                    <Timer/>  
                </div>
                    
                    <div className="button">
                        <button type="button" className="btn btn-primary">Surrender</button>
                    </div>           
            </div>

        </div>        
        
    );
          
    }
    cellclick(i,j) { 
        alert ("JFDWCHJD");
    }
    
}
