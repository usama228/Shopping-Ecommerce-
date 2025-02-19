import React, { createContext } from 'react';
export const authContext = createContext();

export function ProvideAuth({ children }) {
  const storedValue = localStorage.getItem('user');

  let user = null;
  if (storedValue) {
    try {
      user = JSON.parse(storedValue);
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      user = null;
    }
  }
  return (
    <authContext.Provider value={user}>
      {children}
    </authContext.Provider>
  );
}
