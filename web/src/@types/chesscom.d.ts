type Player = {
  avatar: string;
  player_id: number;
  "@id": string;
  name: string;
  username: string;
  followers: number;
  country: string;
  last_online_number;
  joined: number;
  status: string;
  is_streamer: boolean;
  verified: boolean;
  league: "string";
};

type Game = {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  tcn: string;
  uuid: string;
  initial_setup: string;
  fen: string;
  time_class: string;
  rules: string;
  white: {
    rating: number;
    result:
      | "win"
      | "checkmated"
      | "agreed"
      | "repetition"
      | "timeout"
      | "resigned"
      | "stalemate"
      | "lose"
      | "insufficient"
      | "50move"
      | "abandoned"
      | "kingofthehill"
      | "threecheck"
      | "timevsinsufficient"
      | "bughousepartnerlose"
      | "draw"
      | "win"
      | "lose"
      | "outoftime"
      | "cheat"
      | "noclock"
      | "unknown";
    "@id": "https://api.chess.com/pub/player/eggcarrier0";
    username: string;
    uuid: string;
  };
  black: {
    rating: number;
    result:
      | "win"
      | "checkmated"
      | "agreed"
      | "repetition"
      | "timeout"
      | "resigned"
      | "stalemate"
      | "lose"
      | "insufficient"
      | "50move"
      | "abandoned"
      | "kingofthehill"
      | "threecheck"
      | "timevsinsufficient"
      | "bughousepartnerlose"
      | "draw"
      | "win"
      | "lose"
      | "outoftime"
      | "cheat"
      | "noclock"
      | "unknown";
    "@id": string;
    username: string;
    uuid: string;
  };
  eco: string;
};
