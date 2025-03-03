import type { ClassValue } from "clsx";
import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function handleAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    return {
      status: error.status || 500,
      response: null,
      error: error.message,
    };
  }

  return { status: 500, response: null, error: "Something went wrong!" };
}

export { cn, handleAxiosError };
