import React, { createContext, useContext, useState, ReactNode } from "react";

interface PauseContextProps {
  isGamePaused: boolean;
  setIsGamePaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const PauseContext = createContext<PauseContextProps | undefined>(undefined);

interface PauseProviderProps {
  children: ReactNode;
}

export const PauseProvider: React.FC<PauseProviderProps> = ({ children }) => {
  const [isGamePaused, setIsGamePaused] = useState(false);

  const PauseContextValue: PauseContextProps = {
    isGamePaused,
    setIsGamePaused,
  };

  return (
    <PauseContext.Provider value={PauseContextValue}>
      {children}
    </PauseContext.Provider>
  );
};

export const usePause = (): PauseContextProps => {
  const context = useContext(PauseContext);
  if (!context) {
    throw new Error("usePause must be used within a PauseProvider");
  }
  return context;
};
