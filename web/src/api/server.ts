import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

function analyzeMove(fen: string) {
  return api.post("/analyze", { fen });
}

export { analyzeMove };
