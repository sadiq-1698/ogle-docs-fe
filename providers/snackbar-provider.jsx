"use client";

import { useState, useContext, createContext } from "react";

const SnackbarContext = createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

const SnackbarProvider = ({ children }) => {
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [showSnackBar, setShowSnackBar] = useState(false);

  const displaySnackbar = (text) => {
    setSnackBarMsg(text);
    setShowSnackBar(true);
  };

  const closeSnackbar = () => {
    setShowSnackBar(false);
    setSnackBarMsg("");
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackBarMsg,
        showSnackBar,
        closeSnackbar,
        setSnackBarMsg,
        setShowSnackBar,
        displaySnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
