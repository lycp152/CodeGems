import React, { createContext, useContext, useState, ReactNode } from "react";

interface PlayContextProps {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayContext = createContext<PlayContextProps | undefined>(undefined);

interface PlayProviderProps {
  children: ReactNode;
}

export const PlayProvider: React.FC<PlayProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playContextValue: PlayContextProps = {
    isPlaying,
    setIsPlaying,
  };

  return (
    <PlayContext.Provider value={playContextValue}>
      {children}
    </PlayContext.Provider>
  );
};

export const usePlay = (): PlayContextProps => {
  const context = useContext(PlayContext);

  if (!context) {
    throw new Error("usePlay must be used within a PlayProvider");
  }

  return context;
};
