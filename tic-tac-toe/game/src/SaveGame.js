import React from 'react';
import ReactDom from 'react-dom';


export default class SaveGame{
    
    static init(){
        let game = [
            {
            id: 0,   
            player_1: "",            
            player_2: "",
            loser:"",
            winner: "",
            },

           
        ];
       
        this.save("game", game);

    }


    
    
    static get_game(game){
        return(
            JSON.parse(localStorage.getItem("games"))
        );
    }

    static save(game, value){
        localStorage.setItem("games", JSON.stringify(value))
    }
}

