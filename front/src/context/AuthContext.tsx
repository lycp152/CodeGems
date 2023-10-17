import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import "firebase/auth";
import { User } from "firebase/auth";

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

  // Firebaseの認証ステータスが変更されたときに状態を更新
  useEffect(() => {
    // Firebaseの認証ステータスが変更されたときに呼び出されるコールバック
    const handleAuthStateChanged = async (user: User | null) => {
      if (user) {
        // ユーザーがログインしている場合
        setIsLoggedIn(true);

        // FirebaseユーザーオブジェクトからGitHubのアクセストークンを取得
        const githubAccessToken = await user.getIdToken();

        // GitHub APIにアクセスし、GitHubユーザー名を取得
        try {
          const response = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${githubAccessToken}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setGithubUsername(data.login);
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

    // Firebaseの認証ステータスの変更を監視
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);

    // コンポーネントがアンマウントされたときに監視を解除
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
