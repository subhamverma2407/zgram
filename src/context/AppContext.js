import { useContext, createContext, useState } from "react";

const AppContext = createContext();

export const useSpinner = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [isSpinning, setSpinning] = useState(false);

  const value = {
    isSpinning: isSpinning,
    setSpinning: setSpinning,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
