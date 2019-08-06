import React from 'react';
import ReactDom from 'react-dom';
import './Add_Game.css';
import cross from "./cross.png";
import zero from "./zero.png";

export default  class Cell extends React.Component {
   constructor(props){
       super(props);
       this.state={
            value:null,
       }

    }

    render(){
        return(
           
            <div className="Cell" onClick={()=>this.props.onClick()} > {this.props.value} </div>
       
       );
        


    }
}    