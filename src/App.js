import { useState, useEffect } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState('SESSION');
  const [timeLeft, setTimeLeft] = useState(1500);

  const timeout = () =>
    setTimeout(() => {
      if (timeLeft && play) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType('SESSION');
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById('beep');
    if (!timeLeft && timingType === 'SESSION') {
      setTimeLeft(breakLength * 60);
      setTimingType('BREAK');
      audio.play();
    }
    if (!timeLeft && timingType === 'BREAK') {
      setTimeLeft(sessionLength * 60);
      setTimingType('SESSION');
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      timeout();
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);

  const title = timingType === 'SESSION' ? 'Session' : 'Break';
  return (
    <div>
      <div>
        <h1>Break lenght</h1>
        <button onClick={handleBreakIncrease} disabled={play}>
          Increase
        </button>
        {breakLength}
        <button disabled={play} onClick={handleBreakDecrease}>
          Decrease
        </button>
      </div>

      <div>
        <h1>Session lenght</h1>
        <button disabled={play} onClick={handleSessionIncrease}>
          Increase
        </button>
        {sessionLength}
        <button disabled={play} onClick={handleSessionDecrease}>
          Decrease
        </button>
      </div>

      <div>
        <h2>{title}</h2>
        <h3>{timeFormatter()}</h3>
        <button onClick={handlePlay} id='start_stop'>
          Start/Stop
        </button>
        <button onClick={handleReset} id='reset'>
          Reset
        </button>
      </div>
      <audio
        id='beep'
        preload='auto'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      />
    </div>
  );
}

export default App;
