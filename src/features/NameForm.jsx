import React, { useState, useEffect, useCallback } from 'react';

const NameForm = ({ addName, removeName }) => {
    const [isAvailable, setIsAvailable] = useState(false);
    const userName = "David";

    useEffect(() => {
        // Automatically add or remove your name based on availability
        if (isAvailable) {
            addName(userName); // Add your name if available
        } else {
            removeName(userName); // Remove your name if not available
        }

    }, [isAvailable, addName, removeName]); // eslint-disable-line react-hooks/exhaustive-deps
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
