import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const provider = new GithubAuthProvider();

const auth = getAuth();

signInWithPopup(auth, provider)
  .then((result) => {
    
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    const user = result.user;
   
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
  
    const email = error.customData.email;
   
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
