import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import "../styles/RewardNFT.css";

export default function RewardNFT() {
  return (
    <main className="main">
      <h1 className="title">rewardNFT</h1>
      <div className="connect-wallet">
        <ConnectWallet
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />
        <div className="info">Coming soon…</div>
      </div>
      <div className="footer"></div>
    </main>
  );
}
