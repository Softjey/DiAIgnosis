import { useState } from "react";

export type RequestHandler = <T>(promise: Promise<T>) => Promise<T>;

export type Return = [
  handleRequest: RequestHandler,
  isLoading: boolean,
  error: string
];

export function useRequest(): Return {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleRequest<T>(promise: Promise<T>) {
    setIsLoading(true);
    setError("");

    return promise
      .catch((error) => {
        setError(error?.response?.data.message || "An error occurred");

        throw new Error(error);
      })
      .finally(() => setIsLoading(false));
  }

  return [handleRequest, isLoading, error]
}