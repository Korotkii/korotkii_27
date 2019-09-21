import React from 'react';
import ReactDom from 'react-dom';
import {Add_Game} from './Add_Game.css';
import {AddGame} from './AddGame.js';
import {Game} from './game.js';
import SaveGame from './SaveGame.js';
import { Redirect } from 'react-router-dom';


export class Game_List extends React.Component {
    constructor(props){
        super(props);
        // SaveGame.init();
        this.state = {
            redirect: false,
            path: "",
            
        }
    }

   
    render(){
        if (this.state.redirect) {
           return (
               <Redirect to = {this.state.path} />
           );
        }
        

        function handleKeyDown(event) {
            if (event.keyCode == 13) {    // Нажат Enter
         
                // let players={
                //     // id: length +1,
                //     player_1: this.name.value,
                //     player_2: "",
                //     loser:"",
                   
                // }


                
            }
        }
        
        function game_start(){
           
            if( this.name.value == "" ){
                alert ("Необходимо введите своё имя");               
                this.setState({
                    redirect: false
                });
            }

            else{
                let game = SaveGame.get_game("game");
                let length = game.length;    
                
                let newgame = {
                    id: length + 1 ,
                    player_1: this.name.value,          
                   
                };

                game.push(newgame);
                SaveGame.save("game", game);
                
                this.setState({
                    path: "/AddGame/" + newgame.id,
                    redirect: true
                });

            }
            
        }
        
        let game = SaveGame.get_game("game");

        return( 
            <div className="disp">
               
                <div className="title_game" >

                    <h4 className="title_text">Tic tac toe </h4>

                </div>
                
                <input onKeyDown={handleKeyDown} className="pole_name"  placeholder=" Введите своё имя" ref={el => this.name = el}></input>
                
                <div className="select_game">
                    <br/>
                    
                   
                    <Game/> 
                    {game.map(games=>(
                    <div className="Add_player">     
                    

                   
                        <button  className="Add" onClick={game_start.bind(this,games.id)}>  </button>
                    </div>
                    ))}
                </div>

                
            </div>
        );
    }


}
