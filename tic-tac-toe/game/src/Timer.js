import React from 'react';
import ReactDom from 'react-dom';

export class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentTime: null,
            minut: 0
        } 
        this.TimerLauncher()       
        
    }
    
    TimerLauncher(){
        let timer = setInterval(()=>{ 
            var time = this.state.currentTime +1
            var minut = this.state.minut
            if (time == 60){
                var minut = this.state.minut +1
                var time = 0
            }
            
            if (minut === 5){
                clearInterval(timer)
                alert ("Время вышло кто выйграл пока Неопределено!!!")
            }
            this.setState({
                currentTime: time,
                minut: minut
            })
        },1000)
    }
    
    render(){
        return (<div className ="timer"> 0{this.state.minut} мин : {this.state.currentTime} сек</div>
        )
    }

}







































































