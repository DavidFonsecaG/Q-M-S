import React, { useState, useCallback } from 'react';
import Timer from './Timer';
import Navbar from './Navbar';

const DashboardPage = () => {
    const [users, setUsers] = useState([
        {name:"Hans", lastname:"Salentin"},
        {name:"David", lastname:"Fonseca"},
    ]);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);

    // Get current date
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    // Format date
    const formattedDate = `${month} ${day}, ${year}`;

    const addUser = useCallback((newUser) => {
        setUsers(prevUsers => {
            const isDuplicate = prevUsers.some(user => 
                user.name === newUser.name && user.lastname === newUser.lastname
            );
            if (!isDuplicate) {
                return [...prevUsers, newUser];
              }
            return prevUsers;
        });
    }, []);

    const removeUser = useCallback((userToRemove) => {
        setUsers(prevUsers => prevUsers.filter(user => user.name !== userToRemove.name && user.lastname !== userToRemove.lastname));
    }, []);

    const rotateToNextUser = useCallback(() => {
        setCurrentUserIndex(prevIndex => (prevIndex + 1) % Object.keys(users).length);
    }, [users]);

    return (
        <>
            <div className=" flex flex-col h-screen">
                <Navbar users={users} addUser={addUser} removeUser={removeUser}/>
                <main className="flex flex-col items-center justify-around h-full px-3 font-bold md:static">
                    <div className="w-[85vw] max-w-[580px]">
                        <Timer rotateToNextUser={rotateToNextUser}/>
                    </div>
                    <div className="hidden md:inline -rotate-90 text-xs font-normal absolute bottom-15 left-0">{formattedDate}</div>
                    <div className="tracking-wider self-start absolute bottom-14 left-4 md:bottom-20 md:left-20">
                        <h3 className="text-[0.68rem] md:text-sm text-red-600">CURRENT TURN</h3>
                        <div className="pt-2 text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-none uppercase">
                            <h2>{users[currentUserIndex].name} <br/> {users[currentUserIndex].lastname}</h2>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default DashboardPage;
