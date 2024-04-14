import React, { useState, useCallback } from 'react';
import Timer from './Timer';
import NameForm from './NameForm';

const DashboardPage = () => {
    const [names, setNames] = useState({0:{'name':'Hans', 'lastname':'Salentin'}});
    const [currentNameIndex, setCurrentNameIndex] = useState(0);

    // Get current date
    const currentDate = new Date();
    // Get month, day, and year
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    // Format date
    const formattedDate = `${month} ${day}, ${year}`;

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
        <>
            <div className="flex flex-col items-center justify-around h-screen px-3 font-bold md:static">
                <div className="w-[87vw] md:w-[720px]">
                    <Timer rotateToNextName={rotateToNextName}/>
                </div>
                <div className="hidden md:inline -rotate-90 text-xs font-normal absolute bottom-15 left-0">{formattedDate}</div>
                <div className="tracking-wider self-start md:absolute md:bottom-20 md:left-20">
                    <h3 className="text-[0.68rem] md:text-sm text-red-600">CURRENT TURN</h3>
                    <div className="pt-2 text-2xl md:text-5xl lg:text-7xl xl:text-8xl leading-none uppercase">
                        <h2>{names[currentNameIndex].name} <br/> {names[currentNameIndex].lastname}</h2>
                    </div>
                </div>
            </div>
                {/* <div>
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
                </div> */}
        </>
    );
};

export default DashboardPage;
