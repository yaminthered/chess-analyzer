import express from "express";
import { spawn } from "child_process";
import { Chess } from "chess.js";

const app = express();
const PORT = 5001;

const stockfish = spawn("stockfish");
stockfish.stdin.write("uci\n");

app.use(express.json());

app.post("/analyze", async (req, res) => {
  const { pgn, depth = 15 } = req.body;

  if (!pgn) {
    return res.status(400).json({ error: "Missing PGN" });
  }

  const game = new Chess();
  game.loadPgn(pgn);

  let evaluations = [];
  const gameHistory = game.history();
  let previousBestMove = null;

  for (let i = 0; i < gameHistory.length; i++) {
    game.reset();
    let playedMoves = [...gameHistory].slice(0, i + 1);

    for (let move of playedMoves) {
      game.move(move);
    }

    const fen = game.fen();

    const { evaluation, bestMove } = await getStockfishEvaluation(fen, depth);

    evaluations.push({
      move: playedMoves[i],
      fen,
      evaluation,
      bestMove: previousBestMove,
    });

    previousBestMove = bestMove;
  }

  res.json({ evaluations });
});

function getStockfishEvaluation(fen, depth) {
  return new Promise((resolve) => {
    stockfish.stdin.write(`position fen ${fen}\n`);
    stockfish.stdin.write(`go depth ${depth}\n`);

    let outputData = "";

    stockfish.stdout.on("data", (data) => {
      outputData += data.toString();
      console.log(data.toString());

      if (outputData.includes("bestmove")) {
        const evalMatch = outputData.match(/score (cp|mate) (-?\d+)/);
        let evaluation = null;
        if (evalMatch) {
          const type = evalMatch[1];
          const value = parseInt(evalMatch[2]);
          evaluation = type === "cp" ? value / 100 : `#M${value}`;
        }

        const bestMoveMatch = outputData.match(/bestmove (\S+)/);
        const bestMove = bestMoveMatch ? bestMoveMatch[1] : null;

        resolve({ evaluation, bestMove });
      }
    });
  });
}

app.listen(PORT, () => {
  console.log(`Stockfish server running on http://localhost:${PORT}`);
});