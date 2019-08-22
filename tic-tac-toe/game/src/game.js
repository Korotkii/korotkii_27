import React from 'react';
import ReactDom from 'react-dom';
import './Add_Game.css';


export  class Game extends React.Component {
    SaveGame(){
        let NewGame = {
            id: this.id.value ,
            name: this.name.value,
            date: this.date.value

        }
    }

    render(){
        return(
            <div className="game" > 
                <div className="first">
                    {this.first_player.name}
                </div>

                <div className="second">
                    {this.second_player.name}
                </div>
            </div>
        );
    }

}