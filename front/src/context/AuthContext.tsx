import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  githubUsername: string; // GitHubのユーザーネーム
  setGithubUsername: React.Dispatch<React.SetStateAction<string>>; // GitHubのユーザーネームを設定
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [githubUsername, setGithubUsername] = useState(""); // GitHubのユーザーネーム

  const authContextValue: AuthContextProps = {
    isLoggedIn,
    setIsLoggedIn,
    githubUsername,
    setGithubUsername, // GitHubのユーザーネームを設定する関数
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
