import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCDndMwOWE2KsDzaZvkdrf5_irFeGQ5kb8",
  authDomain: "codegame-f4b5b.firebaseapp.com",
  databaseURL: "https://codegame-f4b5b-default-rtdb.firebaseio.com",
  projectId: "codegame-f4b5b",
  storageBucket: "codegame-f4b5b.appspot.com",
  messagingSenderId: "856831727505",
  appId: "1:856831727505:web:793f94abc49d3f12b0ec30",
  measurementId: "G-DGZS5GTEGH"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider  = new GithubAuthProvider();

export { auth, provider}
