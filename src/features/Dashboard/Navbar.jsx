import { useState } from 'react';
import SlideOver from "./Menu";

const Navbar = ({users, addUser, removeUser}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex justify-between px-3 font-bold tracking-wider">
            <div>
                <div className="text-2xl">
                    <span>QMS</span>
                </div>
                <div className="text-[0.68rem] leading-none">
                    <span>Queue Management System</span>
                </div>
            </div>
            <div className="text-red-600 text-[0.75rem] align-top pt-1">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="hover:underline hover:underline-offset-4"
                >MENU</button>
                <SlideOver
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    users={users}
                    addUser={addUser} 
                    removeUser={removeUser}
                />
            </div>
        </nav>
    )
};

export default Navbar;
