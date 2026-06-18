import { useState } from 'react';
import './App.css'

const IS_DEBUG = import.meta.env.DEV;

const WORK_TIME = IS_DEBUG ? 10 : 25 * 60; // 10 seconds for debug, 25 minutes for production


function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(WORK_TIME);

  return (
    <div>
      <div>
        <span>{Math.floor(secondsLeft / 60)}</span>:<span>{secondsLeft % 60}</span>
      </div>
      <div>
        <button>Start</button>
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
