import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Timer = ({ rotateToNextUser }) => {
    const [duration, setDuration] = useState(3); // 30 minutes in seconds.
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
        rotateToNextUser();
        // Reset the timer
        setTimeLeft(duration);
        setIsRunning(true); // Start the timer again
    }, [duration, rotateToNextUser]);

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

    // const formatTime = (time) => {
    //     const minutes = Math.floor(time / 60);
    //     const seconds = time % 60;
    //     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    // };

    const minutes = `${(Math.floor(timeLeft / 60)).toString().padStart(2, '0')}`;
    let seconds = `${(timeLeft % 60).toString().padStart(2, '0')}`;
    const percentage = Math.round(100-((timeLeft / duration) * 100));
    // const percentage = 37;

    return (
        <>
            <CircularProgressbarWithChildren 
                value={percentage}
                strokeWidth={1}
                styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "rgb(220 38 38)",
                    trailColor: "rgb(254 226 226)",
                })}>
                <h2 className="flex gap-6 justify-center text-6xl md:text-8xl xl:text-9xl text-center">
                    <div>   
                        <div>{minutes}</div>
                        <div className="text-sm font-normal pt-2">MINUTES</div>
                    </div>
                    <div>
                        <div>{seconds}</div>
                        <div className="text-sm font-normal pt-2">SECONDS</div>
                    </div>
                </h2>
            </CircularProgressbarWithChildren>
            <div className="pt-9">
                {isRunning ? (
                    <button
                        className="flex w-full justify-center rounded-md bg-red-600 px-3 py-4 text-4xl leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                        onClick={stopTimer}>STOP</button>
                ) : (
                    <button 
                        className="flex w-full h-14 justify-center rounded-md bg-indigo-600 px-3 py-4 text-4xl leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                        onClick={startTimer}>START</button>
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
        </>
    );
};

export default Timer;
