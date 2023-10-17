import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { signInWithGitHub, auth } from "./Firebase"; // FirebaseとGitHubログイン関数をインポート
import "firebase/auth";
import type { User } from "firebase/auth";

// AuthContextPropsの定義（githubUsernameを追加）
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

  // Firebaseの認証ステータスが変更されたときに状態を更新
  useEffect(() => {
    // Firebaseの認証ステータスが変更されたときに呼び出されるコールバック
    const handleAuthStateChanged = (user: User | null) => {
      if (user) {
        // ユーザーがログインしている場合
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    // Firebaseの認証ステータスの変更を監視
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);

    // コンポーネントがアンマウントされたときに監視を解除
    return () => unsubscribe();
  }, []);

  // コンポーネントがマウントされたときにGitHubでのログインを試みる
  useEffect(() => {
    // GitHubログインを試みて成功時にFirebase認証ステータスが変更されます
    signInWithGitHub().catch((error) => {
      console.error("GitHubログインエラー:", error);
    });
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
