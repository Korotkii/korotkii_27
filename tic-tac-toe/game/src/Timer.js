import React from 'react';
import ReactDom from 'react-dom';

export class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentTime: null
            
        } 
        this.clockLauncher()       
        
    }
    
    clockLauncher(){
        let timer = setInterval(()=>{ 
            var time = this.state.currentTime +1
            // var minut = this.state.currentTime / 60
            if (time === 300){
                clearInterval(timer)
            }
            this.setState({
                currentTime: time 
            })
        },1000)
    }
    
    render(){
        return <div className ="timer">Времени прошло: {this.state.currentTime}</div>
    }
}








































































