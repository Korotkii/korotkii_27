import React from 'react';
import ReactDom from 'react-dom';

export class Cell extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            i: 0,
            j: 0
            
        } 
        this.creareCells(i,j)       
        
    }
    createCells (i,j) {
        for (i=0 ; i<=2 ; i++) { 
            for(j=0 ; j<=2 ; j++) { 
                    // <Cell class="my-flex-block-"+i+j onClick={clickcell.bind(this, i,j)}/>
            }
        }

    }
        

    render() { 

        return <div class="my-flex-block-"+ i + j onClick={clickcell.bind(this, i,j)}> </div>
    }







}