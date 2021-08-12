import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  //`${new Date().getMinutes()}:${new Date().getSeconds()}`

  state = {
    status: 'off',
    time: 0,
    timer: null
  }

  handleStateChange() {
    console.log('>> Run /handleShowModal/ from /Album/');
    this.setState({
      status: 'off',
    });
  }

  step() {
    this.setState(prevState => ({
      time: prevState.time - 1
    }))
  };

  step() {
    this.setState(prevState => ({
      time: Number(prevState.time) - 1
    }))
    if (Number(this.state.time) === 0) {
      console.log('GO GO GO !')
      if (this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: '20'
        });
        this.playBell();
      } else if (this.state.status === 'rest') {
        this.setState({
          status: 'work',
          time: '1200'
        });
        this.playBell();
      }
    }
  };

  startTimer() {
    this.setState({
      timer: setInterval(() => this.step(), 1000),
      time: '1200',
      status: 'work',
    });
  };

  stopTimer() {
    this.setState({
      timer: clearInterval(),
      time: '0',
      status: 'off',
    })
  }

  closeApp() {
    window.close()
  }

  playBell() {
    const audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  }

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.state.status === 'off' ?
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p> 
          </div>
          :
          ''
        }
        {(this.state.status === 'work') && <img src="./images/work.png" />}
        {(this.state.status === 'rest') && <img src="./images/rest.png" />}
        {this.state.status !== 'off' ?
          <div className="timer">
            {`${Math.floor((Number(this.state.time) % 3600) / 60)  < 10 ? '0' + Math.floor((Number(this.state.time) % 3600) / 60) : Math.floor((Number(this.state.time) % 3600) / 60)}:${Math.ceil(Number(this.state.time) % 60) < 10 ? '0' + Math.ceil(Number(this.state.time) % 60) : Math.ceil(Number(this.state.time) % 60)}`}
          </div>
          :
          ''
        }
        {this.state.status === 'off' ?
          <button className="btn" onClick={() => this.startTimer()}>Start</button>
          :
          <button className="btn" onClick={() => this.stopTimer()}>Stop</button>
        }
   
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
