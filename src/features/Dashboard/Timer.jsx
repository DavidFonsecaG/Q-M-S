import React, { useState, useEffect } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { database } from '../../services/firebase';
import { ref, onValue } from 'firebase/database';


const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const timerRef = ref(database, 'timer');
        const unsubscribe = onValue(timerRef, (snapshot) => {
          setTimeLeft(snapshot.val());
        });
    
        return () => unsubscribe();
      }, []);

    // const formatTime = (time) => {
    //     const minutes = Math.floor(time / 60);
    //     const seconds = time % 60;
    //     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    // };

    const minutes = `${(Math.floor(timeLeft / 60)).toString().padStart(2, '0')}`;
    let seconds = `${(timeLeft % 60).toString().padStart(2, '0')}`;
    const percentage = Math.round(100-((timeLeft / 60) * 100));

    return (
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
    );
};

export default Timer;
