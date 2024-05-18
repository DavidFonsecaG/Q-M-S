import React from 'react';

const StartTimerButton = () => {
    const startTimer = async () => {
        const response = await fetch('https://us-central1-queue-management-system-e6343.cloudfunctions.net/startTimer?duration=60');
        const result = await response.text();
        console.log(result);
    };

  return (
    <button onClick={startTimer}>Start</button>
  );
};

export default StartTimerButton;
