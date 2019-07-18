import React from 'react';
import ReactDom from 'react-dom';
import { Timer } from './Timer';
import './Add_Game.css';



export class AddGame extends React.Component {
    Surrender_player() {
          
        alert ("Сдался лошара!!!" )
    }
    cellclick(){
        alert ("gamk")
    }
    
    render() { 
       
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
                        <div className="my-flex-block-A1" onClick={this.cellclick} >
                        
                        </div>
                        <div className="my-flex-block-A2" onClick={this.cellclick}>                        
                        </div>
                        <div className="my-flex-block-A3" onClick={this.cellclick}>                        
                        </div>                        
                        <div className="my-flex-block-B1" onClick={this.cellclick}>                        
                        </div>                        
                        <div className="my-flex-block-B2"onClick={this.cellclick}>                        
                        </div>                        
                        <div className="my-flex-block-B3" onClick={this.cellclick}>                        
                        </div>                        
                        <div className="my-flex-block-C1" onClick={this.cellclick}>                       
                        </div>                        
                        <div className="my-flex-block-C2" onClick={this.cellclick}>                        
                        </div>                        
                        <div className="my-flex-block-C3" onClick={this.cellclick}>                       
                        </div>           
                      {/* <Cell/> */}
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

 // let games = localStorage.get("games");
        // { field: [[1, 0, ], [0, , ], [ , , ]]}
        
        // for (i=0 ; i<=2 ; i++) { 
        //     for(j=0 ; j<=2 ; j++) { 
        //             <Cell class="my-flex-block-"+i+j onClick={clickcell.bind(this, i,j)}/>
        //     }
        // }