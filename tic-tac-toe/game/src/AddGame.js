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
            const id = this.props.match.params.id;
            let games = SaveGame.get_game("games");
            let game = games.find(game =>game.id == id)  
            // game.cells = Array(9).fill(null);

        this.state = {
            cells: Array(9).fill(null),
            Next_player: true,
            stepNumber: 0 , 
            redirect: false,   
            game:game,
        }  
    }               
    
    
    Surrender_player() {   
        let stepNumber = this.state.stepNumber;       
        if(stepNumber % 2 === 0) {
            alert("сдался крестик")
            
            let games = SaveGame.get_game("games");
            this.state.game.winner = "О";
            this.setState({game:this.state.game});
            
            let currentIndex = games.findIndex(game => game.id == this.id);
                       
                if( this.state.game.winner == "X"){
                    this.state.game.winner = this.state.game.player_1;
                }
                else {
                    this.state.game.winner = this.state.game.player_2;
                }
            this.setState({game:this.state.game.winner});
            games.splice(currentIndex,1)
            games.push (this.state.game); 
            SaveGame.save("games",games);
             
            this.setState({
                redirect:true,
                path: "/",
                winner: "Победил - О",
            })
        }
        else {
            alert("сдался нолик")             
            let games = SaveGame.get_game("games");
            this.state.game.winner = "X";
            this.setState({game:this.state.game});
            let currentIndex = games.findIndex(game => game.id == this.id);
                       
                if( this.state.game.winner == "X"){
                    this.state.game.winner = this.state.game.player_1;
                }
                else {
                    this.state.game.winner = this.state.game.player_2;
                }
            this.setState({game:this.state.game.winner});
            games.splice(currentIndex,1)
            games.push (this.state.game); 
            SaveGame.save("games",games);
            
            this.setState({
                redirect:true,
                path: "/",
                winner: "Победил - X",
            })
        }            
    }
    
    handleClick(i){  
        const id = this.props.match.params.id;
        let games = SaveGame.get_game("games");  
        let game = games.findIndex(game => game.id == this.id);  
        const number =  game.cells.slice(0, this.state.stepNumber +1);
        const cells = game.cells.slice();
        // const number =  this.state.cells.slice(0, this.state.stepNumber +1);
        // const cells = this.state.cells.slice();
          
        if (Player_winner(cells) || cells[i] ){
            return;
        }
        cells[i] = this.state.Next_player ? 'X':'O';            
        
            // let games = SaveGame.get_game("games");
            this.state.game.cells = cells;
            this.setState({game:this.state.game, cells:this.state.game.cells, stepNumber:number.length});
            
            // SaveGame.save("games", games);
            // let newgame ={
            //     id: this.state.game.id,   
            //     player_1: this.state.game.player_1,
            //     player_2: this.state.game.player_2,
            //     winner: "",
            //     time:"",
            //     cells:this.state.cells,
            // }
            
            let currentIndex = games.findIndex(game => game.id == this.id);
            games.splice(currentIndex,1)
            games.push (this.state.game);
            SaveGame.save("games", games)
        
        this.setState({
            cells:cells,
            Next_player: !this.state.Next_player,
            stepNumber:number.length
        });
    }

    showcell(i){
        return ( 
            <Cell value = {this.state.game.cells[i]}  onClick = {()=>this.handleClick(i)} />
        );
    }    
    
    componentDidMount(){      
            setInterval(()=>{  
                let id = this.props.match.params.id;
                let games = SaveGame.get_game("games");
                let game = games.find(game =>game.id == id);                  
                this.setState({game:game});     
                   
            },1000);
    }

    render() {   

        if(this.state.redirect){
            return <Redirect to = "/" />;  
        }
       
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
        const winner = Player_winner(this.state.game.cells);
        let status;
        
        if (winner) {
            status = 'Победил:'  + winner;
            let games = SaveGame.get_game("games");
            let currentIndex = games.findIndex(game => game.id == this.id);
            this.state.game.winner = winner;             
                if( this.state.game.winner == "X"){
                    this.state.game.winner = this.state.game.player_1;
                }
                else {
                    this.state.game.winner = this.state.game.player_2;
                }
            this.setState({game:this.state.game.winner});
            games.splice(currentIndex,1)
            games.push (this.state.game); 
            SaveGame.save("games",games);
            // let newgame ={
            //     id: this.state.game.id,   
            //     player_1: this.state.game.player_1,
            //     player_2: this.state.game.player_2,
            //     winner: status,
            //     time:"",
            //     cells:this.state.cells,
            // }
            
            // let currentIndex = games.findIndex(game => game.id == this.id);
            // games.splice(currentIndex,1)
            // games.push (newgame);
            // SaveGame.save("games", games)           
            this.setState({
                redirect:true,
                path: "/" + this.state.game.id,
                winner: winner,
            })            
            alert("Победил:" + winner);
        }        
        
        else if (this.state.stepNumber === 9 && winner === null){           
            
            status = "Ничья"
            let games = SaveGame.get_game("games");
            let newgame ={
                id: this.state.game.id,   
                player_1: this.state.game.player_1,
                player_2: this.state.game.player_2,
                winner: status,
                time:"",
            }
            
            let currentIndex = games.findIndex(game => game.id == this.id);
            games.splice(currentIndex,1)
            games.push (newgame);
            SaveGame.save("games", games)
            this.setState({
                redirect: true,
                path: "/" ,
                winner: status ,
            })
        }
        
        else { status = 'Ходит игрок:'   +  (this.state.Next_player ? 'X':'O'); 
           
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
                                {this.state.game.player_1}                         
                            </div>
                            
                            <div className="pic_cross"> 
                                                 
                            </div>

                        </div>                        
                        
                        <div className="second_player">                            
                            
                            <div style={name_2}>     
                            {/* <div className="name_2">                           */}
                            {this.state.game.player_2}                             
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