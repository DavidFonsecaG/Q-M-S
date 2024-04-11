import React, { useState, useEffect } from 'react';

const NameForm = ({ addName, removeName }) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const userName = "David"

  useEffect(() => {
    // Automatically add or remove your name based on availability
    if (isAvailable) {
      addName(userName); // Add your name if available
    } else {
      removeName(userName); // Remove your name if not available
    }
  }, [isAvailable]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h2>Your Availability {userName}</h2>
      <label>
        Available:
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
      </label>
    </div>
  );
};

export default NameForm;
