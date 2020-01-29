import React from 'react';
import ReactDom from 'react-dom';

export default class SaveGame{
    
    static get_game(games){
        let data = localStorage.getItem(games);
        if(data){
            return(
                JSON.parse(data)
            );
        }
        else {
            return [];
        }
    }

    static save(game, value){
        localStorage.setItem("games", JSON.stringify(value))
    }

    
}

