import { useState } from 'react';
import './App.css'

const IS_DEBUG = import.meta.env.DEV;

const WORK_TIME = IS_DEBUG ? 5 : 25 * 60; // 5 seconds for debug, 25 minutes for production


function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(WORK_TIME);

  function startTimer() {
    const intervalId = setInterval(() => {
      setSecondsLeft(prevSecondsLeft => {
        // Updater 関数の中なら，最新の state を参照できる．
        if (prevSecondsLeft > 0) {
          return prevSecondsLeft - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);
  }

  return (
    <div>
      <div>
        <span>{Math.floor(secondsLeft / 60)}</span>:<span>{secondsLeft % 60}</span>
      </div>
      <div>
        <button onClick={ startTimer }>Start</button>
        <button>Pause</button>
        <button>Reset</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <section id="center">
        <PomodoroTimer />
      </section>
    </>
  )
}

export default App
