import React from 'react';
import ReactDom from 'react-dom';

export default class SaveGame{
    
    static init(){
        let games = [
            {id:1,
             player_1: "first",
             player_2: "second",
             winner:"first"
            },
            { id:2,
             player_1: "first",
             player_2: "second",
             winner:"second"
            }
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

