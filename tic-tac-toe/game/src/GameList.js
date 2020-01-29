import React from 'react';
import ReactDom from 'react-dom';
import {Add_Game} from './Add_Game.css';
import {AddGame} from './AddGame.js';
import SaveGame from './SaveGame.js';
import { Redirect } from 'react-router-dom';


export class Game_List extends React.Component {
    constructor(props){        
        super(props);   

        const id = this.props.match.params.id;
        let games = SaveGame.get_game("games");
        let game = games.find(game =>game.id == id);       
        
        this.state = {
            redirect: false,
            path: "",     
            games: SaveGame.get_game("games"),
            game:game,   
        }
    }

    componentDidMount(){   
        setInterval(()=>{     
            let games = SaveGame.get_game("games");                
            this.setState({games:games});  
        },250);    
    
    }

        handleKeyDown(event){
            if(event.target.value == "" ){
                alert ("Необходимо введите своё имя");               
            }
            else{        
                if (event.keyCode == 13){   
                    let games = SaveGame.get_game("games"); 
                    let length = games.length                        
                    let newgame = {
                        id: length + 1 ,
                        player_1: event.target.value,    
                        player_2: "",      
                        winner:"",
                        cells: Array(9).fill(null),
                        Next_player: true,
                        creator:true,
                        count_player: 0, 
                        minut:0,
                        seconds:0,   
                        running_time:0, 
                                           
                    };

                    games.push(newgame);
                    SaveGame.save("games", games);
                    this.setState({
                        path: "/AddGame/" + newgame.id,
                        redirect: true,
                       
                    });      
                }
            }    
        }
        
        
        game_start(){   
            let games = SaveGame.get_game("games"); 
            let length = games.length                  
            if( this.name.value == "" ){
                alert ("Необходимо ввести своё имя");               
            }
            else{                 
                let newgame = {
                    id: length + 1 ,
                    player_1: this.name.value,    
                    player_2: "",      
                    winner: "",
                    cells: Array(9).fill(null),
                    Next_player: true,
                    creator:true,
                    count_player: 0,
                    minut:0,
                    seconds:0,
                    running_time:0,
                    
                };

                games.push(newgame);
                SaveGame.save("games", games);
                this.setState({
                    path: "/AddGame/" + newgame.id,
                    redirect: true,                  
                });
            }            
        }        

        join_player_2(id){
            let games = SaveGame.get_game("games");
            let game = games.find(game =>game.id == id);
            if(this.name.value == ""){
                alert("Необходимо ввести своё имя");                   
            }

            else{   
                game.player_2 = this.name.value;
                let game_index = games.findIndex(game =>game.id == id);
                games.splice(game_index,1);                               
                games.push(game);
                SaveGame.save("games", games);

                this.setState({
                    path:"/AddGame/" + game.id,
                    redirect: true,
                });
            }            
        }


    render(){    
                // убрать коментарии(мертвый код)
        if (this.state.redirect) {
            return (
               <Redirect to = {this.state.path} />
            );
        }        
        const id = this.props.match.params.id;
        let games = SaveGame.get_game("games");
        let game = games.find(game =>game.id == id);
        
        
                
        return( 
            <div className="disp">               
                <div className="title_game" >
                    <h4 className="title_text">Tic tac toe </h4>
                </div>

                <input onKeyUp={this.handleKeyDown.bind(this)} className="pole_name" placeholder="Введите своё имя" ref={el=>this.name=el}></input>
                                
                <div className="select_game">
                    <br/>
                    {this.state.games.map(game=>(                       
                        <div key = {game.id} className="game" onClick={this.join_player_2.bind(this,game.id)}> 
                           
                            <div  className={" first " + (game.winner == game.player_1 ? "winn_player ":"")}>
                                  { game.player_1} {game.winner == game.player_1  ? "✓" :""} <br/>
                                  {/* {game.minut}  {game.seconds}                    */}
                            </div>

                            <div className={" second " + (game.player_2 && game.winner == game.player_2 ? "winn_player":"")}>
                                  { game.player_2 }   {game.player_2 && game.winner == game.player_2  ? "✓" :""} <br/>
                                  {/* {game.minut} {game.seconds} */}
                                                             
                            </div>
                        </div>     
                    ))}
                    
                    <div className="Add_player">          
                       <button className="Add" onClick={this.game_start.bind(this,id)}></button>
                    </div>                   
                
                </div>                
            
            </div>
        );
    }

}
