import React, { useState } from 'react';
import Timer from '../features/Timer';
import NameForm from '../features/NameForm';
// import './Dashboard.css'; // Import CSS file for styling

const DashboardPage = () => {
    const [names, setNames] = useState(['John']);
    const [currentNameIndex, setCurrentNameIndex] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false); // State to track timer's state
  
    const addName = (newName) => {
      if (!names.includes(newName)) {
        const updatedNames = [...names, newName];
        setNames(updatedNames);
  
        if (isTimerRunning) {
          // If the timer is running, update the currentNameIndex
          setCurrentNameIndex(updatedNames.indexOf(newName));
        }
      }
    };
  
    const removeName = (nameToRemove) => {
      const updatedNames = names.filter(name => name !== nameToRemove);
      setNames(updatedNames);
  
      if (currentNameIndex >= updatedNames.length) {
        // If the removed name was the last in the list or the only one,
        // reset the currentNameIndex to the beginning
        setCurrentNameIndex(0);
      }
    };
  
    const handleTimerStart = () => {
      setIsTimerRunning(true);
    };
  
    const handleTimerStop = () => {
      setIsTimerRunning(false);
    };
  
    return (
      <div>
        <Timer
          names={names}
          currentNameIndex={currentNameIndex}
          setCurrentNameIndex={setCurrentNameIndex}
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          onStart={handleTimerStart}
          onStop={handleTimerStop}
        />
        <div className="name-form-container">
          <NameForm addName={addName} removeName={removeName} />
        </div>
        <div className="name-list-container">
          <h2>Queue of Names</h2>
          <ul className="name-list">
            {names.map((name, index) => (
              <li key={index} className={index === currentNameIndex ? 'current-name' : ''}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default DashboardPage;
