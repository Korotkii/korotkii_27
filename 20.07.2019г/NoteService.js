
export default class NoteServise {
    static getNote(){
        return(
        JSON.parse(localStorage.getItem("notebook"))
        );
    }

    static save (notes){
       localStorage.setItem("notebook",JSON.stringify(notes))
    }
}
