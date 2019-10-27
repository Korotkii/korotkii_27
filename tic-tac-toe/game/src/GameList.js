import React from 'react';
import ReactDom from 'react-dom';
import {Add_Game} from './Add_Game.css';
import {AddGame} from './AddGame.js';
import SaveGame from './SaveGame.js';
import { Redirect } from 'react-router-dom';



export class Game_List extends React.Component {
    constructor(props){
        
        super(props);
        // SaveGame.init();        
            const id = this.props.match.params.id;
            let games = SaveGame.get_game("games");
            let game = games.find(game =>game.id == id);       
        this.state = {
            redirect: false,
            path: "",     
            games: SaveGame.get_game("games"),
            game:game,   
            // id: this.props.match.params.id, 
        }
    }

    componentDidMount(){   
        setInterval(()=>{           
            const id = this.props.match.params.id;
            let games = SaveGame.get_game("games");
            let game = games.find(game =>game.id == id);          
            // game.cells = cells;                  
            // this.setState({game:game});   
        },250);    
    
}
    render(){     
        if (this.state.redirect) {
            return (
               <Redirect to = {this.state.path} />
            );
        }  
        debugger;      
        const id = this.props.match.params.id;
        let games = SaveGame.get_game("games");
        let game = games.find(game =>game.id == id);
        
        function handleKeyDown(event) {
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
        
        function game_start(){   
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
                };

                games.push(newgame);
                SaveGame.save("games", games);
                this.setState({
                    path: "/AddGame/" + newgame.id,
                    redirect: true,                  
                });
            }            
        }        

        function join_player_2(id){
            let games = SaveGame.get_game("games");
            let game = games.find(game =>game.id == id);
            // if(this.state.game.player_1 !=="" && this.state.game.player_2 !==""){   // этим условием я хочу проверить что игрок 1 и 2 имеют имя, и по этому надо перекинуть на их игру для просмотра игры
            //     this.setState({
            //         path:"/AddGame/" + id,
            //         redirect:true,
                    
            //     })
            //     alert("fss");
            // }
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
        
        let first = "first";
        let second = "second";

        return( 
            <div className="disp">               
                <div className="title_game" >
                    <h4 className="title_text">Tic tac toe </h4>
                </div>

                <input onKeyUp={handleKeyDown.bind(this)} className="pole_name" placeholder="Введите своё имя" ref={el=>this.name=el}></input>
                                
                <div className="select_game">
                    <br/>
                    {this.state.games.map(game=>(                       
                        <div key = {game.id} className="game" onClick={join_player_2.bind(this,game.id)}> 
                           
                            <div  className={" first " + (game.winner == game.player_1? "winn_player":"")}>
                                Name - {game.player_1} <br/>
                                id -   {game.id}  <br/>
                                winn - {game.winner} 
                            </div>

                            <div className={" second " + (game.winner == game.player_2? "winn_player":"")}>
                                Name - {game.player_2} <br/>
                                id -   {game.id}<br/>
                                winn - {game.winner}
                            </div>
                        </div>     
                    ))}
                    
                    <div className="Add_player">          
                       <button className="Add" onClick={game_start.bind(this,id)}></button>
                    </div>
                   
                </div>

                
            </div>
        );
    }


}
