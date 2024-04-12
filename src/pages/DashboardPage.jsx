import React, { useState, useCallback } from 'react';
import Timer from '../features/Timer';
import NameForm from '../features/NameForm';

const DashboardPage = () => {
    const [names, setNames] = useState(['John']);
    const [currentNameIndex, setCurrentNameIndex] = useState(0);

    const addName = useCallback((newName) => {
        setNames(prevNames => {
            if (!prevNames.includes(newName)) {
                return [...prevNames, newName];
              }
            return prevNames;
        });
    }, []);

    const removeName = useCallback((nameToRemove) => {
        setNames(prevNames => prevNames.filter(name => name !== nameToRemove));
    }, []);

    const rotateToNextName = useCallback(() => {
        setCurrentNameIndex(prevIndex => (prevIndex + 1) % names.length);
    }, [names]);

    return (
        <div>
            <Timer rotateToNextName={rotateToNextName}/>
            <div>
                <h2>{names[currentNameIndex]}'s Turn</h2>
            </div>
            <div>
                <NameForm addName={addName} removeName={removeName} />
            </div>
            <div>
                <h2>Queue of Names</h2>
                <ul>
                    {names.map((name, index) => (
                        <li key={index}>
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DashboardPage;
