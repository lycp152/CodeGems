import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  UserCredential,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDndMwOWE2KsDzaZvkdrf5_irFeGQ5kb8",
  authDomain: "codegame-f4b5b.firebaseapp.com",
  databaseURL: "https://codegame-f4b5b-default-rtdb.firebaseio.com",
  projectId: "codegame-f4b5b",
  storageBucket: "codegame-f4b5b.appspot.com",
  messagingSenderId: "856831727505",
  appId: "1:856831727505:web:793f94abc49d3f12b0ec30",
  measurementId: "G-DGZS5GTEGH",
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// Firebase認証を取得
const auth = getAuth(app);
const provider = new GithubAuthProvider();

export { auth, provider };

// GitHubでのログイン関数を作成
export const signInWithGitHub = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error("GitHubログインエラー:", error);
    throw error;
  }
};
