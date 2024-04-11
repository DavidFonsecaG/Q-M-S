import React, { useState, useEffect } from 'react';

const Timer = ({ names, currentNameIndex, setCurrentNameIndex, isTimerRunning, onStart, onStop }) => {
  const [duration, setDuration] = useState(30 * 60); // 30 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [inputDuration, setInputDuration] = useState('');

  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 0) {
            resetTimer();
            return duration;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning, duration]);

  const resetTimer = () => {
    // Rotate to the next name
    setCurrentNameIndex(prevIndex => (prevIndex + 1) % names.length);
    // Reset the timer
    setTimeLeft(duration);
    onStart(); // Start the timer again
  };

  const handleDurationChange = () => {
    const newDuration = parseInt(inputDuration, 10);
    if (!isNaN(newDuration) && newDuration > 0) {
      setDuration(newDuration * 60); // Convert minutes to seconds
      setTimeLeft(newDuration * 60);
      onStop();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Timer</h1>
      <div>{formatTime(timeLeft)}</div>
      <div>
        {isTimerRunning ? (
          <button onClick={onStop}>Stop</button>
        ) : (
          <button onClick={onStart}>Start</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Enter duration (minutes)"
          value={inputDuration}
          onChange={(e) => setInputDuration(e.target.value)}
        />
        <button onClick={handleDurationChange}>Set Duration</button>
      </div>
      <div>
        <h2>{names[currentNameIndex]}'s Turn</h2>
      </div>
    </div>
  );
};

export default Timer;
