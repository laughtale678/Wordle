import { useState } from "react";
import "./App.css";
import Game from "./Game";
import Ranking from "./Ranking";
import Header from "./Header";
import Footer from "./Footer";

function App() {

  const [page, setPage] = useState("game");

  return (
    <>
      <Header setPage={setPage}/>
      <main className="main">
        {page === "ranking" && <Ranking />}
        {page === "game" &&  <Game />}
      </main>
      <Footer/>
    </>
  );
}

export default App;
