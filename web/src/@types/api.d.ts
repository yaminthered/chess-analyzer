type ApiResponse<T> = {
  status: number;
  response: T | null;
  error: string | null;
};
