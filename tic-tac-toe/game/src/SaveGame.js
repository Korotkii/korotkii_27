import React from 'react';
import ReactDom from 'react-dom';

export default class SaveGame{
    
    static init(){
        let games = [
            {
            id: 1,   
            player_1: "Илья",            
            player_2: "Таня",
            winner: "",
            timer:"",
            },           
        ];  

        this.save("games", games);
    }  
    
    static get_game(games){
        return(
            JSON.parse(localStorage.getItem(games))
        );
    }

    static save(game, value){
        localStorage.setItem("games", JSON.stringify(value))
    }

    
}

