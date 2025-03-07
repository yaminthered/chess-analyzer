import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Chess, Move } from "chess.js";
import ChessBoard from "@/components/chess-board";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/analyzer/")({
  component: Analyzer,
});

const pgn =
  '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2025.03.01"]\n[Round "-"]\n[White "yaminthered"]\n[Black "GuelBleyde"]\n[Result "1-0"]\n[CurrentPosition "r1b2rk1/pp3ppB/2n5/3q4/8/8/PP3PPP/R2Q1RK1 b - -"]\n[Timezone "UTC"]\n[ECO "D50"]\n[ECOUrl "https://www.chess.com/openings/Queens-Gambit-Declined-Semi-Tarrasch-Pillsbury-Variation-5...cxd4-6.Nxd4"]\n[UTCDate "2025.03.01"]\n[UTCTime "17:59:13"]\n[WhiteElo "1173"]\n[BlackElo "1178"]\n[TimeControl "600"]\n[Termination "yaminthered won by resignation"]\n[StartTime "17:59:13"]\n[EndDate "2025.03.01"]\n[EndTime "18:03:30"]\n[Link "https://www.chess.com/game/live/123432688720"]\n\n1. d4 {[%clk 0:09:57.3]} 1... d5 {[%clk 0:09:58.2]} 2. Nf3 {[%clk 0:09:54.8]} 2... Nf6 {[%clk 0:09:54.4]} 3. c4 {[%clk 0:09:52.4]} 3... e6 {[%clk 0:09:52.9]} 4. Nc3 {[%clk 0:09:45.5]} 4... c5 {[%clk 0:09:38.9]} 5. Bg5 {[%clk 0:09:41.5]} 5... cxd4 {[%clk 0:09:25.8]} 6. Nxd4 {[%clk 0:09:39.7]} 6... Be7 {[%clk 0:09:16]} 7. e3 {[%clk 0:09:20.8]} 7... O-O {[%clk 0:08:25.9]} 8. cxd5 {[%clk 0:09:13.3]} 8... Nxd5 {[%clk 0:08:18.8]} 9. Bxe7 {[%clk 0:09:08.9]} 9... Nxe7 {[%clk 0:08:01.1]} 10. Bd3 {[%clk 0:09:06.4]} 10... Nbc6 {[%clk 0:07:54.7]} 11. O-O {[%clk 0:08:42.7]} 11... Nxd4 {[%clk 0:07:50.3]} 12. exd4 {[%clk 0:08:40.4]} 12... Nc6 {[%clk 0:07:49.1]} 13. d5 {[%clk 0:08:31.9]} 13... exd5 {[%clk 0:07:42.4]} 14. Nxd5 {[%clk 0:08:28.8]} 14... Qxd5 {[%clk 0:07:37]} 15. Bxh7+ {[%clk 0:08:22.3]} 1-0\n';

function Analyzer() {
  const [game, setGame] = useState<Chess>(new Chess());
  const [currentMove, setCurrentMove] = useState(0);
  const [moves, setMoves] = useState<Move[]>([]);

  console.log({ fen });

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
