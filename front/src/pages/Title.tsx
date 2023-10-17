import React from "react";
import "../styles/Title.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useAuth } from "../context/AuthContext";
import LongButton from "../components/LongButton";
import TitleMenu from "../components/TitleMenu";
import { provider } from "../context/Firebase";
import { signInWithPopup, getAuth } from "firebase/auth";
import { FirebaseError } from "@firebase/util";

interface TitleProps {
  toggleHowToPlay: () => void;
  toggleRewardNFT: () => void;
  toggleGemSkin: () => void;
  toggleRanking: () => void;
  toggleResult: () => void;
  handlePlay: () => void;
}

const Title: React.FC<TitleProps> = ({
  toggleRewardNFT,
  toggleGemSkin,
  toggleRanking,
  toggleResult,
  handlePlay,
}) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogin = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, provider)
      .then((result) => {
        setIsLoggedIn(true);
        console.log(result);
      })
      .catch((e) => {
        if (e instanceof FirebaseError) {
          console.log(e);
        }
      });
  };

  const renderButtonSection = () => {
    if (!isLoggedIn) {
      return (
        <LongButton
          icon={<GitHubIcon style={{ fontSize: 35, marginRight: "10px" }} />}
          label="Log in with GitHub"
          onClick={handleLogin}
        />
      );
    } else {
      return (
        <>
          <TitleMenu
            toggleRewardNFT={toggleRewardNFT}
            toggleGemSkin={toggleGemSkin}
            toggleRanking={toggleRanking}
            toggleResult={toggleResult}
          />
          <LongButton label="Play" onClick={handlePlay} />
        </>
      );
    }
  };

  return (
    <div className="title-container">
      <h1 className="title">CodeGems</h1>
      <div className="button-container">{renderButtonSection()}</div>
    </div>
  );
};

export default Title;
