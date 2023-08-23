import "./styles/Home.css";
import Title from "./pages/Title"; // Titleコンポーネントをインポート

export default function Home() {
  return (
    <main className="main">
      <div className="main-contents">
        <Title />
      </div>
      <footer>
        <p>Copyright © 2023 🧙草咲か爺さんズ All Rights Reserved.</p>
      </footer>
    </main>
  );
}
