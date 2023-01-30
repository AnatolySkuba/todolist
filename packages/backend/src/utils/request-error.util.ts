interface ErrorWithStatus extends Error {
  status?: number;
}

export const RequestErrorUtil = (status: number, message: string) => {
  const error = new Error(message) as ErrorWithStatus;
  error.status = status;

  return error;
};
