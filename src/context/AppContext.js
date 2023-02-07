import { createContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [serverData, setServerData] = useState([]);
  const [serverErrors, setServerErrors] = useState([]);
  return (
    <AppContext.Provider
      value={{ serverData, setServerData, serverErrors, setServerErrors }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };
