// useLocalStorage.js
import { useState, useEffect } from 'react';

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to local storage", error);
  }
};

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error("Error loading from local storage", error);
    return defaultValue;
  }
};

const resetLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error resetting local storage", error);
  }
};

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => loadFromLocalStorage(key, defaultValue));

  useEffect(() => {
    saveToLocalStorage(key, state);
  }, [key, state]);

  const reset = () => {
    resetLocalStorage(key);
    setState(defaultValue);
  };

  return [state, setState, reset];
};

export default useLocalStorage;
