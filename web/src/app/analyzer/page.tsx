import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Chess, Move } from "chess.js";
import ChessBoard from "@/components/chess-board";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/analyzer/")({
  component: Analyzer,
});

const pgn = `1. e4 {[%clk 0:09:57.3]} 1... c5 {[%clk 0:09:56.8]} 2. Nc3 {[%clk 0:09:53.6]} 2... d6 {[%clk 0:09:53.9]} 3. Nf3 {[%clk 0:09:49.3]} 3... Nf6 {[%clk 0:09:49.5]} 4. Bb5+ {[%clk 0:09:46.7]} 4... Bd7 {[%clk 0:09:47.2]} 5. Qe2 {[%clk 0:09:26.7]} 5... g6 {[%clk 0:09:39.2]} 6. d4 {[%clk 0:09:01.3]} 6... a6 {[%clk 0:09:34.9]} 7. Bxd7+ {[%clk 0:08:49.3]} 7... Nbxd7 {[%clk 0:09:34.8]} 8. d5 {[%clk 0:08:47.3]} 8... Bg7 {[%clk 0:09:31.4]} 9. h4 {[%clk 0:08:43.2]} 9... h5 {[%clk 0:09:28.4]} 10. Bg5 {[%clk 0:08:35.3]} 10... O-O {[%clk 0:09:26.1]} 11. O-O-O {[%clk 0:08:15.4]} 11... Qb6 {[%clk 0:09:10.8]} 12. Rd3 {[%clk 0:07:37.6]} 12... Rfe8 {[%clk 0:08:56.5]} 13. Nd1 {[%clk 0:07:31.2]} 13... Ng4 {[%clk 0:08:31.2]} 14. Nh2 {[%clk 0:07:06.7]} 14... Qxb2+ {[%clk 0:08:07.5]} 15. Nxb2 {[%clk 0:07:04.6]}`;

function Analyzer() {
  const [game, setGame] = useState<Chess>(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [currentMove, setCurrentMove] = useState(0);
  const [moves, setMoves] = useState<Move[]>([]);

  useEffect(() => {
    const newGame = new Chess();
    newGame.loadPgn(pgn);
    setMoves(newGame.history({ verbose: true }));
  }, []);

  const handleNextMove = () => {
    if (currentMove < moves.length) {
      const newGame = new Chess(game.fen());
      newGame.move(moves[currentMove]);
      setGame(newGame);
      setFen(newGame.fen());
      setCurrentMove((prev) => prev + 1);
    }
  };

  const handlePrevMove = () => {
    if (currentMove > 0) {
      const newGame = new Chess();
      for (let i = 0; i < currentMove - 1; i++) {
        newGame.move(moves[i]);
      }
      setGame(newGame);
      setFen(newGame.fen());
      setCurrentMove((prev) => prev - 1);
    }
  };

  const handleResetBoard = () => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setCurrentMove(0);
  };

  const handleGoToLastMove = () => {
    const newGame = new Chess();
    for (let i = 0; i < moves.length; i++) {
      newGame.move(moves[i]);
    }
    setGame(newGame);
    setFen(newGame.fen());
    setCurrentMove(moves.length);
  };

  return (
    <Container>
      <div className="flex gap-4">
        <ChessBoard fen={fen} />
        <div>
          <Button onClick={handleNextMove}>next</Button>
          <Button onClick={handlePrevMove}>prev</Button>
          <Button onClick={handleGoToLastMove}>go to last move</Button>
          <Button onClick={handleResetBoard}>reset board</Button>
        </div>
      </div>
    </Container>
  );
}
