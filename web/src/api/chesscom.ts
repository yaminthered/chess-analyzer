import axios from "axios";
import { handleAxiosError } from "@/lib/utils";

const api = axios.create({
  baseURL: import.meta.env.VITE_CHESSCOM_API_URL,
});

async function getProfile(username: string): Promise<ApiResponse<Player>> {
  try {
    const response = await api.get(`/player/${username}`);

    return {
      status: response.status,
      response: response.data,
      error: null,
    };
  } catch (error: unknown) {
    return handleAxiosError(error);
  }
}

async function getGamesArchive(
  username: string,
): Promise<ApiResponse<string[]>> {
  try {
    const response = await api.get(`/player/${username}/games/archives`);

    return {
      status: response.status,
      response: response.data,
      error: null,
    };
  } catch (error: unknown) {
    return handleAxiosError(error);
  }
}

async function getGamesInMonth(
  month: number,
  year: number,
): Promise<ApiResponse<any>> {
  try {
    const response = await api.get(`/games/${year}/${month}`);

    return {
      status: response.status,
      response: response.data,
      error: null,
    };
  } catch (error: unknown) {
    return handleAxiosError(error);
  }
}

export { getProfile, getGamesArchive, getGamesInMonth };
