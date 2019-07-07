import React from 'react';
import ReactDom from 'react-dom';
export class Clock extends React.Component {
        constructor(props){
        super(props);
        this.state = {
            currentTime: (new Date()).toLocaleString()
            
        } 
        this.clockLauncher()       
        
    }
    
    clockLauncher(){
        setInterval(()=>{ 
            console.log('time')
            this.setState({
                currentTime: (new Date()).toLocaleString() 
            })
        },1000)
    }
    
    render(){
        return <div className ="clock">{this.state.currentTime}</div>
    }
}