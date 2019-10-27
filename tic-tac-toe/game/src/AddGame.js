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

        this.state = {
            // cells: Array(9).fill(null), не нужен уже, перенесли в локал сторедж
            // Next_player: true, не нужен уже, перенесли в локал сторедж
            stepNumber: 0 , 
            redirect: false,   
            game:game,
            creator: game.creator,
            path:"",
            observer:game.count_player >= 2 ,

        }  
        game.creator = false;
        game.count_player ++;
        let currentIndex = games.findIndex(game => game.id == id);
        games.splice(currentIndex,1)
        games.push (game); 
        SaveGame.save("games",games);
    }               

    Surrender_player() {  
        const id = this.props.match.params.id;
        let games = SaveGame.get_game("games");  
        let game = games.find(game => game.id == id);
        if( game.Next_player == true && this.state.creator == true || game.Next_player == false && !this.state.creator ){ 
            if (game.Next_player == false){
                alert("сдался нолик ")
                game.winner = "X";            

                    if( game.winner == "X"){
                        game.winner = game.player_1;
                    }
                    
                
                let currentIndex = games.findIndex(game => game.id == id);
                games.splice(currentIndex,1)
                games.push (game); 
                SaveGame.save("games",games);
                
                this.setState({
                    redirect:true,
                    path: "/",
                })
            }
        
            else {
                alert("сдался Крестик")      
                game.winner = "O";                       
                    if( game.winner == "O"){
                        game.winner = game.player_2;
                    }
                    // else {
                    //     game.winner = game.player_1;
                    // }
                let currentIndex = games.findIndex(game => game.id == id);
                games.splice(currentIndex,1)
                games.push(game); 
                SaveGame.save("games",games);
                
                this.setState({
                    redirect:true,
                    path: "/",
                    
                })
            }   
        }         
    }
    
    handleClick(i){  
        debugger;
        const id = this.props.match.params.id;
        let games = SaveGame.get_game("games");  
        let game = games.find(game => game.id == id); 
        
        if( !this.state.observer && ( game.Next_player == true && this.state.creator == true || game.Next_player == false && !this.state.creator )){
            
            const number =  game.cells.slice(0, this.state.stepNumber +1);
            const cells = game.cells.slice();            
            
            if (Player_winner(cells) || cells[i] ){
                return;
            }
            cells[i] = game.Next_player ? 'X':'O';            
            game.Next_player = !game.Next_player;
            game.cells = cells;                
            
            let currentIndex = games.findIndex(game => game.id == id);
            games.splice(currentIndex,1)
            games.push (game);
            SaveGame.save("games", games)
            
            this.setState({
                stepNumber:number.length,                
            });
        }       
    }

    showcell(i){
        let id = this.props.match.params.id;
        let games = SaveGame.get_game("games");
        let game = games.find(game =>game.id == id); 
        return ( 
            <Cell value = {game.cells[i]}  onClick = {()=>this.handleClick(i)} />
        );
    }    
    
    componentDidMount(){      
            setInterval(()=>{                
                let id = this.props.match.params.id;
                let games = SaveGame.get_game("games");
                let game = games.find(game =>game.id == id); 
                let winner = game.winner;                 
                
                if(!this.state.observer &&( winner || winner == "Ничья" )){
                    this.setState({
                        game:game,
                        redirect:true,
                        path: "/",                
                    });    
                }
                else {
                    this.setState({
                        game:game,
                    }); 
                }  
            },250);
    }

    render(){   

        if(this.state.redirect){
            return <Redirect to = "/" />;  
        }
       
        let name_1 = {
            position: "absolute",
            left: "0",
            width: "170px",
            height: "50px", 
            textindent: "6px",           
        }

        let name_2 = {
            position: "absolute",
            right: "0px",
            width: "170px",
            height: "50px",
            textindent: "6px",
        }
        let mov_X = {
            position: "absolute",
            left: "0",
            width: "162px",
            height: "46px",
            border: "red 3px solid",
            bordertop: "none",
            borderleft: "none",
            borderright: "none",
            textindent: "6px",
        }
        let mov_O = {
            position: "absolute",
            right: "0p",
            width: "162px",
            height: "46px",
            border: "red 3px solid",
            bordertop: "none",
            borderleft:"none",
            borderright: "none",
            textindent: "6px",
        }   
        // let name_1 ;
        // let name_2 ;
        // let mov_X;
        // let mov_O ;
        // const id = this.props.match.params.id;
        // let games = SaveGame.get_game("games");  
        // let game = games.find(game => game.id == id); 
        // // let stepNumber = this.state.stepNumber;   

        //     // if(stepNumber % 2 === 0) {
        //     if(game.Next_player == true){
        //         // let name_1 = "name_1";
        //         // let mov_X = "mov_X";
        //         name_1 = mov_X;
        //     }
        //     else{ 
        //         // let name_2 = "name_2";
        //         // let mov_O = "mov_O";
        //         name_2 = mov_O
        //         ;
        //     }
        // // }
        const id = this.props.match.params.id;
        let games = SaveGame.get_game("games");  
        let game = games.find(game => game.id == id); 
          
            if(game.Next_player == true){
                name_1 = mov_X
            }
            else{ 
                name_2 = mov_O
            }
        
        const winner = Player_winner(game.cells);
        let status;
        
        if (winner) {
            status = 'Победил:'  + winner;          
            let games = SaveGame.get_game("games");
            let game = games.find(game => game.id == id);
           
            game.winner = winner;             
                if( game.winner == "X"){
                    game.winner = game.player_1;
                }
                else {
                    game.winner = game.player_2;
                }
            let currentIndex = games.findIndex(game => game.id == this.id);
            games.splice(currentIndex,1)
            games.push (game); 
            SaveGame.save("games",games);          
            
            this.setState({
                redirect:true,
                path: "/" + game.id,
            })            
            alert("Победил:" + winner);
        }        
        
        else if (this.state.stepNumber === 5 && winner == null){           
            status = "Ничья"
            const id = this.props.match.params.id;
            let games = SaveGame.get_game("games");
            let game = games.find(game => game.id == id);
            game.winner = status;
            alert (status)
            let currentIndex = games.findIndex(game => game.id == id);
            games.splice(currentIndex,1)
            games.push (game);
            SaveGame.save("games", games)
            this.setState({
                redirect: true,
                path: "/" ,
                winner: "Ничья" ,
            })
        }
        
        else { status = 'Ходит игрок:'   +  (game.Next_player ? 'X':'O'); 
           
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
                                {game.player_1}                         
                            </div>
                            
                            <div className="pic_cross"> 
                                                 
                            </div>

                        </div>                        
                        
                        <div className="second_player">                            
                            
                            <div style={name_2}>     
                            {/* <div className="name_2">                           */}
                            {game.player_2}                             
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