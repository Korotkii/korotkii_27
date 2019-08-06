import React from 'react';
import ReactDom from 'react-dom';
import { Timer } from './Timer';
import './Add_Game.css';
import cross from "./cross.png";
import zero from "./zero.png";
import Cell from "./cells.js";


export class AddGame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // cells: JSON.parse(localStorage.getItem("game")),
            cells: Array(9).fill(null),
            Next_player: true,
            stepNumber: 0
        }
    
     
    }
    
    
    
    Surrender_player() {
          
        alert ("Сдался лошара!!!" )
    }
    
    

    handleClick(i){
        const number =  this.state.cells.slice(0, this.state.stepNumber +1);
        const cells= this.state.cells.slice();
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
        return ( <Cell value= {this.state.cells[i]} onClick = {()=>this.handleClick(i)} />
        );
    }
    
    
    render() { 
      
        const winner = Player_winner(this.state.cells);
        let status;
        let win = " ";
        if (winner) {
            status = 'Победил:' + winner;
            win = status;
            alert (win);
        }
        
        else if (this.state.stepNumber === 9 && winner === null){
            status = "Ничья"
        }
        
        else{ status = 'Ходит игрок:'  + win +  (this.state.Next_player ? 'X':'O');

        }

        return (
            
            <div className="disp">
               
                <div className="title_game" >                    
                    <h4 className="title_text">Tic tac toe </h4>                
                </div>                
                
                <div className = "pole">                    
                   
                    <div className="player_name">                        
                        
                        <div className="first_player">                            
                          
                            <div className="name_1">                                
                                <h4>Player 1</h4>                            
                            </div>
                            
                            <div className="pic_cross"> 
                                                 
                            </div>

                        </div>                        
                        
                        <div className="second_player">                            
                            
                            <div className="name_2">                                
                                <h4>"Player 2"</h4>                            
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
                       
                   
                    <div className="time">                        
                        <Timer/>                      
                    </div>                        
                         
                    <div className="button">
                        <button type="button" className="btn btn-primary" onClick={this.Surrender_player}>Surrender</button>                                         
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