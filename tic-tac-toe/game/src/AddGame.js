import React from 'react';
import ReactDom from 'react-dom';
import { Timer } from './Timer';
import './Add_Game.css';
import cross from "./cross.png";
import zero from "./zero.png";
import  ActivePlayer from "./ActivePlayer.js";
import Cells from "./cell.js";



export class AddGame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cells: JSON.parse(localStorage.getItem("game"))
        
           
        }
    
     
    }
    
    
    Surrender_player() {
          
        alert ("Сдался лошара!!!" )
    }
    
    cellclick(id){
        
        this.setState({active:id})     
       
    }
    
    render() { 
       
        let cells = this.state.cells;
            if(!cells){
                cells = [];
            }
        let activePlayer = cells.find(cell=>cell.id == this.state.active)
            if(!activePlayer){
                activePlayer = {}; 
            }
        console.dir(activePlayer);


        return (
            
            <div className="disp">
                <Cells/>
                <div className="title_game" >                    
                    <h4 className="title_text">Tic tac toe </h4>                
                </div>                
                
                <div className = "pole">                    
                   
                    <div className="player_name">                        
                        
                        <div className="first_player">                            
                          
                            <div className="name_1">                                
                                <h4>"Player 1"</h4>                            
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

                    </div>
                        
                    
                        <div className="my-flex-container"  >
                            {cells.map(cell => (
                            <div key={cell.id} onClick={this.cellclick.bind(this,cell.id)}>                         
                                 <div className="my-flex-block-A1" ></div>
                                 
                            </div>
                             ))} 
                        </div>
                                             
                    
                    <ActivePlayer activePlayer1 = {activePlayer}/>
                   
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