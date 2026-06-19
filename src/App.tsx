import { useState, useRef } from 'react';
import './App.css';

const IS_DEBUG = import.meta.env.DEV;

const WORK_TIME = IS_DEBUG ? 5 : 25 * 60; // 5 seconds for debug, 25 minutes for production

function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const intervalId = useRef<number | undefined>(undefined);

  function startTimer() {
    if (isRunning) return; // 二重にタイマーが走らないようにする

    setIsRunning(true);

    intervalId.current = setInterval(() => {
      setSecondsLeft((prevSecondsLeft) => {
        // Updater 関数の中なら，最新の state を参照できる．
        if (prevSecondsLeft > 0) {
          return prevSecondsLeft - 1;
        } else {
          clearInterval(intervalId.current);
          setIsRunning(false);
          return 0;
        }
      });
    }, 1000);
  }

  return (
    <div>
      <div>
        <span>{String(Math.floor(secondsLeft / 60)).padStart(2, '0')}</span>:
        <span>{String(secondsLeft % 60).padStart(2, '0')}</span>
      </div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button
          onClick={() => {
            clearInterval(intervalId.current);
            setIsRunning(false);
          }}
        >
          Pause
        </button>
        <button
          onClick={() => {
            clearInterval(intervalId.current);
            setIsRunning(false);
            setSecondsLeft(WORK_TIME);
          }}
        >
          Reset
        </button>
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
  );
}

export default App;
