import React, { useEffect, useState } from 'react';
import { database } from '../../../services/firebase';
import { ref, onValue, set } from 'firebase/database';

const PauseResumeButton = () => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const pausedRef = ref(database, 'timerPaused');

    const unsubscribePaused = onValue(pausedRef, (snapshot) => {
      setIsPaused(snapshot.val());
    });

    return () => {
      unsubscribePaused();
    };
  }, []);

  const pauseTimer = async () => {
    const newPauseState = !isPaused;
    await set(ref(database, 'timerPaused'), newPauseState);
  };

  return (
    <button onClick={pauseTimer}>
      {isPaused ? 'Resume Timer' : 'Pause Timer'}
    </button>
  );
};

export default PauseResumeButton;
