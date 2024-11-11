import React, { createContext, useState, useContext } from "react";

// Create AppContext
const AppContext = createContext();

// AppProvider component to provide context values
export const AppProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(false); // e.g., for storing user info
  const [theme, setTheme] = useState("dark"); // e.g., for theme management
  const [rbUserPosts, setRBUserPosts] = useState([]); // initialized as an array to avoid errors with .map
  const [wishlistBook, setWishlistBooks] = useState([]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        userAuth,
        setUserAuth,
        toggleTheme,
        rbUserPosts,
        setRBUserPosts,
        wishlistBook, 
        setWishlistBooks
      }}
    >
            {children}   {" "}
    </AppContext.Provider>
  );
};

// Custom hook to use AppContext
export const useAppContext = () => useContext(AppContext);
