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

  return (
    <PlayContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </PlayContext.Provider>
  );
};

export const usePlay = () => {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error("usePlay must be used within a PlayProvider");
  }
  return context;
};
