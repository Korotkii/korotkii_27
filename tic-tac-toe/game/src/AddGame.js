import React from 'react';
import ReactDom from 'react-dom';
import { Timer } from './components/Timer/Timer.js';
import './Add_Game.css';
import cross from "./components/picture/cross.png";
import zero from "./components/picture/zero.png";
import Cell from "./components/Cells/Cells.js";
import { Redirect } from 'react-router-dom';
import SaveGame from "./SaveGame.js";

export class AddGame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cells: Array(9).fill(null),
            Next_player: true,
            stepNumber: 0 , 
            redirect: false,
            player_1:this.props.name,
        } 
    }       
    
    Surrender_player() {   
        let stepNumber = this.state.stepNumber;       
        if(stepNumber % 2 === 0) {
            alert("сдался крестик")
            let loser = "X"
            let game = SaveGame.get_game("game");
            let length = game.length;
            
            let newgame ={
                id: length+1,   
                player_1: this.state.player_1,          
                player_2: "",
                loser: loser,
                // winner: winner,
            }

            game.push (newgame);
            SaveGame.save("game", game)
    
            this.setState({
                redirect:true,
                path: "/",
                loser: loser,
            })
        }
        else {
            alert("сдался нолик") 
            let loser = "O"
            let game = SaveGame.get_game("game");
            let length = game.length;
            
            let newgame ={
                id: length+1,   
                player_1: "",          
                player_2: "",
                loser: loser,
                // winner: winner,
            }

            game.push (newgame);
            SaveGame.save("game", game)
            
            this.setState({
                redirect:true,
                path: "/",
                loser: loser,
            })

        }      
        
    }
    
    handleClick(i){        
        const number =  this.state.cells.slice(0, this.state.stepNumber +1);
        const cells= this.state.cells.slice();
        // console.dir(cells);
          
        if (Player_winner(cells) || cells[i] ){
            return;
        }
        cells[i] = this.state.Next_player ? 'X':'O';            
        
        this.setState({
            cells:cells,
            Next_player:!this.state.Next_player,
            stepNumber:number.length
        });
    }

    showcell(i){
        return ( 
            <Cell value = {this.state.cells[i]}  onClick = {()=>this.handleClick(i)} />
        );
    }
    
    
    render() {   

        if(this.state.redirect){
            return <Redirect to = "/" />;  // вернуться в корень
        }

        const id = this.props.match.params.id;
        let game = SaveGame.get_game("game");
        let games = game.find(games =>games.id ==id)

        let name_1 = {
            position: "absolute",
            left: "0",
            width: "170px",
            height: "50px",            
        }

        let name_2 = {
            position: "absolute",
            right: "0px",
            width: "170px",
            height: "50px",
        }
        let mov_X = {
            position: "absolute",
            left: "0",
            width: "163px",
            height: "47px",
            border: "red 3px solid",
            bordertop: "none",
            borderleft: "none",
            borderright: "none",
        }
        let mov_O = {
            position: "absolute",
            right: "0p",
            width: "163px",
            height: "47px",
            border: "red 3px solid",
            bordertop: "none",
            borderleft:"none",
            borderright: "none",
        }   

        let stepNumber = this.state.stepNumber;       
            if(stepNumber % 2 === 0) {
                name_1 = mov_X
            }
            else{ 
                name_2 = mov_O
            }
        const winner = Player_winner(this.state.cells);
        let status;
        
        if (winner) {
            status = 'Победил:'  + winner;
            let game = SaveGame.get_game("game");
            // let length = game.length;
            
            let newgame ={
                id: id,   
                player_1: "тут должно быть имя игрока с главной страницы где создается список игр",
                winner: winner,
            }

            let currentIndex = game.findIndex(games => games.id == id);
            game.splice(currentIndex,1)

            game.push (newgame);
            SaveGame.save("game", game)
    
            this.setState({
                redirect:true,
                path: "/",
                winner: winner,
            })
            
            alert(33);

        }        
        
        else if (this.state.stepNumber === 9 && winner === null){
            status = "Ничья"
            this.setState({
                redirect: true,
                path: "/",
                winner: status ,


            })

        }
        
        else{ status = 'Ходит игрок:'   +  (this.state.Next_player ? 'X':'O'); 
           
        }

        return (
            
            <div className="disp">
               
                <div className="title_game" >                    
                    <h4 className="title_text">Tic tac toe </h4>                
                </div>                
                
                <div className = "pole">                    
                   
                    <div className="player_name">                        
                        
                        <div className="first_player">                            
                          
                            <div style={name_1}>                                
                            {/* <div className="name_1"> */}
                                Player 1                         
                            </div>
                            
                            <div className="pic_cross"> 
                                                 
                            </div>

                        </div>                        
                        
                        <div className="second_player">                            
                            
                            <div style={name_2}>     
                            {/* <div className="name_2">                           */}
                                Player 2                             
                            </div>
                            
                            <div className="pic_zero">
                              
                            </div>   

                        </div> 
                        <div className="winner">{status}</div>
                    </div>
                        
                    
                        <div className="my-flex-container"  >
                           
                            

                            <div className="my-flex-block-A1" id="0"   >
                            {this.showcell(0)} 
                            </div>
                
                            <div className="my-flex-block-A2" id="1"  >
                            {this.showcell(1)}
                            </div>                        
                                            
                            <div className="my-flex-block-A3" id="2"  >                        
                            {this.showcell(2)}
                            </div>                        
                            
                            <div className="my-flex-block-B1" id="3"   >                        
                            {this.showcell(3)}
                            </div>                        
                            
                            <div className="my-flex-block-B2" id="4"  >                        
                            {this.showcell(4)}
                            </div>                        
                                                
                            <div className="my-flex-block-B3" id="5"  >                        
                            {this.showcell(5)}
                            </div>                        
                                                
                            <div className="my-flex-block-C1" id="6"  >                       
                            {this.showcell(6)}
                            </div>                        
                                            
                            <div className="my-flex-block-C2" id="7"  >                        
                            {this.showcell(7)}
                            </div>                        
                                                
                            <div className="my-flex-block-C3" id="8"  >                       
                            {this.showcell(8)}
                            </div>  
                
                        </div> 
                       
                   
                    <div>                        
                        <Timer/>                      
                    </div>                        
                         
                    <div className="button">
                        <button type="button" className="btn btn-primary" onClick={this.Surrender_player.bind(this)}>Surrender</button>                                         
                    </div>     
                </div>
            
            

        </div>
        );       
    }   
   
}

function Player_winner(cells){

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length ; i++){
        const [a,b,c] = lines [i];
        if (cells[a] && cells[a]===cells[b] && cells[a]===cells[c]){
            return cells[a];
        }
    }
    return null;
}