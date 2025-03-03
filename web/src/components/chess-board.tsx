import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";

function ChessBoard({ fen }: { fen: string }) {
  return (
    <div className="flex aspect-square w-full justify-center">
      <Chessground
        fen={fen}
        orientation="white"
        style={{ width: "100%", height: "auto" }}
        viewOnly
      />
    </div>
  );
}

export default ChessBoard;
