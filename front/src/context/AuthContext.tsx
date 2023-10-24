import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./Firebase";

// AuthContextPropsの定義
interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  githubUsername: string;
  setGithubUsername: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [githubUsername, setGithubUsername] = useState("");

  useEffect(() => {
    const handleAuthStateChanged = async (user: User | null) => {
      if (user) {
        setIsLoggedIn(true);

        // アクセストークンのリフレッシュと再認証
        try {
          const githubAccessToken = await user.getIdToken();

          const response = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${githubAccessToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setGithubUsername(data.login);
          } else if (response.status === 401) {
            // アクセストークンの期限切れなどで再認証が必要
            // ここで再認証のプロセスを開始
            console.log(
              "GitHubアクセストークンが期限切れです。再認証して新しいトークンを取得してください。"
            );
          } else {
            console.error("GitHubユーザー名の取得に失敗しました。");
          }
        } catch (error) {
          console.error("GitHubユーザー名の取得エラー:", error);
        }
      } else {
        setIsLoggedIn(false);
        setGithubUsername("");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return () => unsubscribe();
  }, []);

  const authContextValue: AuthContextProps = {
    isLoggedIn,
    setIsLoggedIn,
    githubUsername,
    setGithubUsername,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
