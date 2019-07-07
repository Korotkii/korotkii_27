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
            // if (time === 5){
            //     clearInterval(timer)
            // }
            this.setState({
                currentTime: time 
            })
        },1000)
    }
    
    render(){
        return <div className ="timer">Времени прошло:{this.state.currentTime}</div>
    }
}








































































// class TimerWrapper extends React.Component {
//     constructor (props){
//         super(props)
//         this.startTimer = this.startTimer.bind(this)
//         this.state = {
//             timeLeft: null,
//             timer: null
//         }
//     }
//     startTimer(timeLeft){
//         clearInterval(this.state.timer)
//         let timer = setInterval(()=>{
//             var timeLeft = this.state.timeLeft - 1
//             if (timeLeft === 0){
//                 clearInterval(timer)
//             }
//             this.setState({
//                 timeLeft: timeLeft
//             })
//         }, 1000)
//         return this.setState({timeLeft: timeLeft, timer: timer})
//     }
   
//     render(){
//         return(
//             <div>
//                 <H2>Timer</H2>
//                 <div>
//                     <Button time="5"  startTimer={this.startTimer}/>
//                     <Button time="10" startTimer={this.startTimer}/>
//                     <Button time="15" startTimer={this.startTimer}/>
//                 </div>
//                 <TimerDisplay timeLeft={ this.state.timeLeft}/>
//                 <audio id="end" preload="auto" src="media/timer-bell_m1tycbno.mp3"></audio>
//             </div>
//         )
//     }

// }
// class Button extends React.Component {
//     handlerstartTimer(){
//         return this.props.startTimer(this.props.time)
//     }
//     render () {
//         return <button onClick={this.handlerstartTimer.bind(this)}>
//         {this.props.time} секунд </button>
//     }
    
// }
// class TimerDisplay extends React.Component {
//     render() {
//         if(this.props.timeLeft === 0){
//         document.getElementById("end").play()
//         }
//         if(this.props.timeLeft=== 0 || this.props.timeLeft == null){
//             return <div></div>
//         }
//         return <H1> Времени осталось: {this.props.timeLeft}</H1>
//     }
// }

// ReactDOM.render(
// <TimerWrapper/>,
// document.getElementById('content')
// );