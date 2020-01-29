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
            let id = this.props.match.params.id;
            let games = SaveGame.get_game("games");
            let game = games.find(game =>game.id == id)  

        this.state = {
            stepNumber: 0 , 
            redirect: false,   
            game:game,
            games:games,
            creator: game.creator,
            path:"",
            observer:game.count_player >= 2 ,
            currentTime: null,
            minut: 0,
            seconds:0,
            running_time:0,
            Next_player: true,
        }  
        game.creator = false;
        game.count_player ++;
        let currentIndex = games.findIndex(game => game.id == id);
        games.splice(currentIndex,1)
        games.push (game); 
        SaveGame.save("games",games);
        this.game_time();
        this.click_timer();
    }               

    surrender_player() {  
        let id = this.props.match.params.id;
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

        let id = this.props.match.params.id;
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

    click_timer(){
        let id = this.props.match.params.id;
        let games = SaveGame.get_game("games");
        let game = games.find(game => game.id ==id);

        if(game.player_1 !=="" && game.player_2 !== "" ){
            var player_move = setInterval(() =>{
            var running_time = this.state.currentTime + 1;
            
            if(this.state.Next_player == true && running_time == 30 || this.state.Next_player == false && running_time == 30 ){
                    // alert ("Время вышло игра закончена!!!")
                    
                    let id = this.props.match.params.id;
                    let games = SaveGame.get_game("games");
                    let game = games.find(game =>game.id == id);
                    
                    let currentIndex = games.findIndex(game => game.id == id);
                    games.splice(currentIndex,1)
                    games.push (game);
                    SaveGame.save("games", games)
                    
                    this.setState({
                        redirect:true,
                        path: "/",         
                    })   
                    clearInterval(player_move);
                } 

                if(this.state.Next_player == false){
                
                    let id = this.props.match.params.id;
                    let games = SaveGame.get_game("games");
                    let game = games.find(game =>game.id == id);
                    
                    game.running_time = this.state.Next_player;
                    this.state.Next_player = 0;
                    
                    let currentIndex = games.findIndex(game => game.id == id);
                    games.splice(currentIndex,1);
                    games.push (game);
                    SaveGame.save("games", games);
    
                    this.setState({
                        player_move: player_move,
                        running_time: running_time,
                                 
                    })  
                }

                let id = this.props.match.params.id;
                let games = SaveGame.get_game("games");
                let game = games.find(game =>game.id == id);
                                    
                game.running_time = this.state.running_time;

                let currentIndex = games.findIndex(game => game.id == id);
                games.splice(currentIndex,1)
                games.push (game);
                SaveGame.save("games", games)

                this.setState({
                    player_move: player_move,
                    running_time: running_time,
                           
                })  
            },3000); 
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
    
    

    game_time(){  
        let id = this.props.match.params.id;
        let games = SaveGame.get_game("games");
        let game = games.find(game =>game.id == id);
    
        if(game.player_1 !== "" && game.player_2 !==""){
            let timer = setInterval(()=>{                 
            var seconds = this.state.currentTime +1
            var minut = this.state.minut
           
            if (seconds == 60){
                var minut = this.state.minut +1
                var seconds = 0
            }
                
            // if (minut === 5 && seconds=== 2){
            //     clearInterval(timer)
            //     alert ("Время вышло игра закончена!!!")
            //     this.setState({
            //         redirect:true,
            //         path: "/",           
            //     })
            // }
            let id = this.props.match.params.id;
            let games = SaveGame.get_game("games");
            let game = games.find(game =>game.id == id);
                
            game.minut = this.state.minut
            game.seconds = this.state.seconds

            let currentIndex = games.findIndex(game => game.id == id);
            games.splice(currentIndex,1)
            games.push (game);
            SaveGame.save("games", games)
                
                this.setState({
                    currentTime: seconds,
                    minut: minut,
                    seconds:seconds,
                })
            },3000);

        }
         

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
        },100);
        
        
    }

    render(){

        if(this.state.redirect){
            return <Redirect to = "/" />;  
        }
       
       
        let name_1 = " name_1" ;
        let name_2 = " name_2";
        let mov_X = " mov_X";
        let mov_O = " mov_O";
        let id = this.props.match.params.id;
        let games = SaveGame.get_game("games");  
        let game = games.find(game => game.id == id); 
        
            if(game.Next_player == true){
                name_1 = name_1 + mov_X;
            }
            else{ 
                name_2 = mov_O;
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
            let id = this.props.match.params.id;
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
        id = this.props.match.params.id;
        games = SaveGame.get_game("games");
        game = games.find(game => game.id == id);
       
        return (            
            
            <div className="disp">
            
                <div className="title_game" >                    
                    <h4 className="title_text">Tic tac toe </h4>                
                </div>                
                
                <div className = "pole">                    
                   
                    <div className="player_name">                        
                        
                        <div className="first_player">                            
                          
                            
                            <div className={name_1}>
                                {game.player_1}                         
                            </div>
                            
                            <div className="pic_cross"> 
                                                 
                            </div>

                        </div>                        
                        
                        <div className="second_player">                            
                            
                            <div className={name_2}>                          
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
                        <div className ="timer"> {game.minut} мин : {game.seconds} сек</div>            
                    </div>                        
                         
                    <div className="button">
                        <button type="button" className="btn btn-primary" onClick={this.surrender_player.bind(this)}>Surrender</button>                                         
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