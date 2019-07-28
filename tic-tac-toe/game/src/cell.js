import React from 'react';
import ReactDom from 'react-dom';
import './Add_Game.css';

export default class Cells extends React.Component {
    render(){
            
            let cell_A1 = {id:1}
            let cell_A2 = {id:2}
            let cell_A3 = {id:3}
            let cell_B1 = {id:4}
            let cell_B2 = {id:5}
            let cell_B3 = {id:6}
            let cell_C1 = {id:7}
            let cell_C2 = {id:8}
            let cell_C3 = {id:9}

            let cells=[cell_A1, cell_A2, cell_A3,cell_B1, cell_B2, cell_B3,cell_C1, cell_C2, cell_C3];
                  
            cells=JSON.stringify(cells); // из массива в строку дклаем

            localStorage.setItem("game", cells);  // положить в локал сторадж с id = notebook, переменную notes
        
            let cells_1 = localStorage.getItem("game"); // извлеч в переменную notes_1  строку notebook


            cells_1 = JSON.parse(cells); // из строки в массив делаем
            
            // <div>
            //     <div className="my-flex-block-A1" id="A1" onClick={this.cellclick.bind(this)} >
            //     </div>
                
            //     <div className="my-flex-block-A2" id="A2" onClick={this.cellclick.bind(this)}>
            //     </div>                        
                                
            //     <div className="my-flex-block-A3" id="A3" onClick={this.cellclick.bind(this)}>                        
            //     </div>                        
                
            //     <div className="my-flex-block-B1" id="B1"  onClick={this.cellclick.bind(this)}>                        
            //     </div>                        
                
            //     <div className="my-flex-block-B2" id="B2" onClick={this.cellclick.bind(this)}>                        
            //     </div>                        
                                    
            //     <div className="my-flex-block-B3" id="B3" onClick={this.cellclick.bind(this)}>                        
            //     </div>                        
                                    
            //     <div className="my-flex-block-C1" id="C1" onClick={this.cellclick.bind(this)}>                       
            //     </div>                        
                                    
            //     <div className="my-flex-block-C2" id="C2" onClick={this.cellclick.bind(this)}>                        
            //     </div>                        
                                    
            //     <div className="my-flex-block-C3" id="C3" onClick={this.cellclick.bind(this)}>                       
            //     </div>  
            // </div> 

        return (
            <div> Cells_1_9</div>
        );   
    }
}