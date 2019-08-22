export default class GameService{
    static GetGame(){
        return(
            JSON.parse(localStorage.getItem("Tic_Tac_Toe_Game"))
        );
    }

    static save(notes){
        localStorage.setItem("Tic_Tac_Toe_Game", JSON.stringify(notes))
    }
}

