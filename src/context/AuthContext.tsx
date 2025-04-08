import React, { createContext, useState, ReactNode, useContext } from 'react';
import { User } from '../interfaces/user'; 
import { AuthContextType } from '../interfaces/AuthContextType'; 



// Create the AuthContext with a default value of null
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // State to store the logged-in user

  // Function to log in a user
  const login = (user: User) => {
    setUser(user); // Set the user state
  };

  // Function to log out the user
  const logout = () => {
    setUser(null); // Clear the user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
