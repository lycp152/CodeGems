import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  return (
    <main className="main">
      <h1 className="title">CodeGems</h1>
      <div className="connect">
        <ConnectWallet
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />
      </div>
      <div className="footer"></div>
    </main>
  );
}
