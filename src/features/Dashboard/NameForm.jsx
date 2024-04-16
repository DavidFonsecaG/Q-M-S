import React, { useState, useEffect, useCallback } from 'react';

const NameForm = ({ addUser, removeUser }) => {
    const [isAvailable, setIsAvailable] = useState(false);
    const user = {name:"Mateo", lastname:"Diaz"};

    useEffect(() => {
        // Automatically add or remove your name based on availability
        if (isAvailable) {
            addUser(user); // Add your name if available
        } else {
            removeUser(user); // Remove your name if not available
        }

    }, [isAvailable, addUser, removeUser]); // eslint-disable-line react-hooks/exhaustive-deps
    const handleAvailabilityChange = useCallback((e) => {
        setIsAvailable(e.target.checked);
    }, []);

    return (
        <div>
            <h3>Your Availability</h3>
            <label>
                Available:
                <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={handleAvailabilityChange}
                />
            </label>
        </div>
    );
};

export default NameForm;
