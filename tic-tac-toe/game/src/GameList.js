import React from 'react';
import ReactDom from 'react-dom';
import {Add_Game} from './Add_Game.css';
// import {AddGame} from './AddGame.js';

export class Game_List extends React.Component {
   AddPlayer(){
    //    alert (" +1 player")
    //    <AddPlayer/>
   }

    render(){
        return( 
            <div className="disp">
               
                <div className="title_game" >

                    <h4 className="title_text">Tic tac toe </h4>

                </div>
                
                <input className="pole_name" type="text" placeholder=" Введите своё имя"></input>
                
                <div className="select_game">

                </div>

                <div className="Add_player">
                    
                    <button type="button" className="Add" onClick={this.AddPlayer}>+</button>
                </div>
            </div>
        );
    }


}