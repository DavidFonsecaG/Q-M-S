import React, { useState, useEffect, useCallback } from 'react';

const Timer = ({ rotateToNextName }) => {
    const [duration, setDuration] = useState(3); // 30 minutes in seconds. should be 30 * 60
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [inputDuration, setInputDuration] = useState('');

    const startTimer = useCallback(() => {
        setIsRunning(true);
    }, []);

    const stopTimer = useCallback(() => {
        setIsRunning(false);
    }, []);

    const resetTimer = useCallback(() => {
        // Rotate to the next name
        rotateToNextName();
        // Reset the timer
        setTimeLeft(duration);
        setIsRunning(true); // Start the timer again
    }, [duration, rotateToNextName]);

    useEffect(() => {
        let intervalId;

        if (isRunning) {
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
    }, [isRunning, duration, resetTimer]);

    const handleDurationChange = useCallback(() => {
        const newDuration = parseInt(inputDuration, 10);
        if (!isNaN(newDuration) && newDuration > 0) {
            setDuration(newDuration * 60); // Convert minutes to seconds
            setTimeLeft(newDuration * 60);
            setIsRunning(false);
        }
    }, [inputDuration]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <h1>Timer</h1>
            <h2>{formatTime(timeLeft)}</h2>
            <div>
                {isRunning ? (
                    <button onClick={stopTimer}>Stop</button>
                ) : (
                    <button onClick={startTimer}>Start</button>
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
        </div>
    );
};

export default Timer;
