import React from 'react';
import ReactDom from 'react-dom';
import {Add_Game} from './Add_Game.css';
// import {AddGame} from './AddGame.js';
import {Game} from './game.js';
import GameService from './SaveGame';


export class Game_List extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // gameNumber: 0 ,
            game: GameService.GetGame()
        }
    }

    Game_start(){
        let NewGame = {
            id: this.id.value ,
            name: this.name.value,
            date: this.date.value

        }

        
    }

    render(){
        return( 
            <div className="disp">
               
                <div className="title_game" >

                    <h4 className="title_text">Tic tac toe </h4>

                </div>
                
                <input className="pole_name" type="text" placeholder=" Введите своё имя"></input>
                
                <div className="select_game">
                    <br/>
                   {players.map(player=>(
                        <div className="game" key={game.id} onClick = {this.showPlayers.bind(this,game.id)} > 
                            <div className="first">
                                {first_player.name}
                            </div>

                            <div className="second">
                                {second_player.name}
                            </div>
                        </div>

                   ))}
                
                    <div className="Add_player">     

                        <button type="button" className="Add" onClick={this.Game_start.bind(this)}>  </button>
                    </div>
                </div>

                
            </div>
        );
    }


}
