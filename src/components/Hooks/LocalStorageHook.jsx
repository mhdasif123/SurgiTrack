import React, { useEffect, useState } from 'react'

export function LocalStorageHook(key, valuesFromStorage) {
    
    const [value, setValue] = useState(() => {
        try {
            // Below line check if the key is in our local storage and if not return null
            const storageValues = localStorage.getItem(key);
            // If found returns the values from storage || return the values input into the function
            return storageValues ? JSON.parse(storageValues): valuesFromStorage;
        } catch (error) {
            console.error("Error reading localStorage: ", error);
            return valuesFromStorage;
        }
    });

    // Saving the information inside of the localStorage
    useEffect(() => {
        try {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error("Error writing localStorage: ", error);
        }
    }, [key,value])



  return [value,setValue]
}

export default LocalStorageHook