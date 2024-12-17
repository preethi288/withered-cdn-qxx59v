import { useState } from "react";

const ROWS = 6;
const COLS = 7;
const TIMER = 30;

function Board({ currentPlayer, gameOver, setGameOver, switchTurn }) {
  const [hoveredCell, setHoveredCell] = useState({});
  const [board, setBoard] = useState(Array(ROWS).fill(Array(COLS).fill(null)));

  const dropPiece = (col, row) => {
    if (gameOver) return;
    // for (let row = ROWS - 1; row >= 0; row--) {

    console.log(row, "row");
    console.log(col, "col");
    console.log("board is before", board);

    if (!board[row][col]) {
      const newBoard = [...board];
      console.log("board is here", newBoard[row][col]);
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);

      if (checkWinner(newBoard, row, col)) {
        setGameOver(true);
      } else {
        switchTurn();
      }
      // break;
      // }
    }
  };

  const checkWinner = (board, row, col) => {
    const directions = [
      { r: 1, c: 0 },
      { r: 0, c: 1 },
      { r: 1, c: 1 },
      { r: -1, c: 1 },
    ];

    for (let direction of directions) {
      let count = 1;
      for (let i = 1; i < 4; i++) {
        const newRow = row + direction.r * i;
        const newCol = col + direction.c * i;
        if (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          board[newRow][newCol] === currentPlayer
        ) {
          count++;
        } else {
          break;
        }
      }

      for (let i = 1; i < 4; i++) {
        const newRow = row - direction.r * i;
        const newCol = col - direction.c * i;
        if (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          board[newRow][newCol] === currentPlayer
        ) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 4) return true;
    }
    return false;
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell === "Player 1" ? "cell1" : ""} ${
                cell === "Player 2" ? "cell2" : ""
              } ${
                hoveredCell?.colIndex === colIndex &&
                hoveredCell?.rowIndex == rowIndex
                  ? "highlight"
                  : ""
              }`}
              onClick={() => dropPiece(colIndex, rowIndex)}
              onMouseEnter={() => setHoveredCell({ colIndex, rowIndex })}
              onMouseLeave={() => setHoveredCell(null)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
