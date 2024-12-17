import { useState, useEffect } from "react";
import "./styles.css";
import Timer from "./Timer";
import Board from "./Board";

const TIMER = 30;

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");
  const [timer, setTimer] = useState(TIMER);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      switchTurn();
    }
  }, [timer, gameOver]);

  const switchTurn = () => {
    setTimer(TIMER);
    setCurrentPlayer((prevPlayer) =>
      prevPlayer === "Player 1" ? "Player 2" : "Player 1"
    );
  };

  const renderStatus = () => {
    return (
      <div className="status">
        {gameOver ? `${currentPlayer} wins` : `${currentPlayer}'s turn`}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Connect 4</h1>
      <Timer timer={timer} />
      {renderStatus()}
      <Board currentPlayer={currentPlayer} gameOver={gameOver} setGameOver={setGameOver} switchTurn={switchTurn}/>
    </div>
  );
}
