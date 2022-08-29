import './App.scss';
import { PlayFill, StopFill, ArrowDown, ArrowUp, ArrowRepeat } from 'react-bootstrap-icons';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [breakL, setBreakL] = useState(5);
  const [sessionL, setSessionL] = useState(25);
  const [time, setTime] = useState(sessionL * 60);
  const [bool, setBool] = useState(false);
  const [changeSessionBool, setChangeSessionBool] = useState(false);

  function increment(state, setState) {
    state < 60 && !bool && setState(prev => prev + 1);
  }
  function decrement(state, setState) {
    state > 1 && !bool && setState(prev => prev - 1);
  }
  function reset() {
    setBool(false);
    setChangeSessionBool(false);
    setBreakL(5);
    setSessionL(25);
    setTime(1500);
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  }
  function format(time) {
    const m = Math.floor(time / 60);
    const s = time % 60;
    if (s < 10) {
      if (m < 10) {
        return '0' + m + ':0' + s;
      }
      return m + ':0' + s;
    } else {
      if (m < 10) {
        return '0' + m + ':' + s;
      }
      return m + ':' + s;
    }
  }

  useEffect(() => {
    !changeSessionBool && setTime(sessionL * 60)
  }, [sessionL, changeSessionBool])

  useEffect(() => {
    changeSessionBool && setTime(breakL * 60)
  }, [breakL, changeSessionBool])

  useEffect(() => {
    if (time === 0) {
      document.getElementById('beep').play();
    }
  }, [time])

  useEffect(() => {
    if (!changeSessionBool) {
      const timeout = bool && setTimeout(() => time >= 0 && setTime(time - 1), 1000);
      if (time < 0) {
        setChangeSessionBool(prev => !prev);
        setTime(breakL * 60);
      }
      return () => {
        clearTimeout(timeout)
      }
    } else {
      const timeout = bool && setTimeout(() => time >= 0 && setTime(time - 1), 1000);
      if (time < 0) {
        setChangeSessionBool(prev => !prev);
        setTime(sessionL * 60);
      }
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [time, bool, changeSessionBool, breakL, sessionL])


  return (
    <div className="App">
      <div className="main-container">
        <div className="cnt-1"> <h2> 25 + 5 Clock </h2> </div>
        <div className="cnt-2">
          <div>
            <div><h4 id="break-label">Break Length</h4></div>
            <div className='inc-dec'>
              <ArrowDown id="break-decrement" className='icons' onClick={() => decrement(breakL, setBreakL)} />
              <p id="break-length">{breakL}</p>
              <ArrowUp id="break-increment" className='icons' onClick={() => increment(breakL, setBreakL)} />
            </div>
          </div>
          <div>
            <div><h4 id="session-label">Session Length</h4></div>
            <div className='inc-dec'>
              <ArrowDown id="session-decrement" className='icons' onClick={() => decrement(sessionL, setSessionL)} />
              <p id="session-length">{sessionL}</p>
              <ArrowUp id="session-increment" className='icons' onClick={() => increment(sessionL, setSessionL)} />
            </div>
          </div>
        </div>
        <div className="cnt-3">
          <h4 id="timer-label" style={time < 60 ? { color: 'red' } : { color: 'aliceblue' }}>{!changeSessionBool ? 'Session' : 'Break'}</h4>
          <h1 id="time-left" style={time < 60 ? { color: 'red' } : { color: 'aliceblue' }}>{format(time)}</h1>
        </div>
        <div className="cnt-4">
          <div id="start_stop" onClick={() => setBool(prev => !prev)}>
            {!bool ? <PlayFill className='icons' /> : <StopFill className='icons' />}
          </div>
          <ArrowRepeat id="reset" style={{ width: 30, height: 30, marginTop: 5, marginLeft: 7 }} className='icons' onClick={reset} />
        </div>
        <footer>Coded by <a target="_blank" rel="noreferrer" href='https://github.com/TheLastDance'>TheLastDance</a></footer>
      </div>
      <audio id='beep' src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'></audio>
    </div>
  );
}

export default App;
