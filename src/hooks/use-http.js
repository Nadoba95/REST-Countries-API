import { useCallback, useState } from "react";

export function useHttpAll() {
  const sendRequest = useCallback(async (requestUrl) => {
    try {
      const response = await fetch(requestUrl);

      if (!response.ok) {
        throw new Error("Request Failed!");
      }

      return response.json();
    } catch (error) {
      alert(error.message);
    }
  }, []);

  const sendPromiseAll = useCallback(async (requestUrls, applyData) => {
    try {
      const data = await Promise.all(requestUrls);
      applyData(data);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return {
    sendRequest,
    sendPromiseAll,
  };
}

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = useCallback(async (requestUrl, applyData) => {
    setIsLoading(true);
    try {
      const response = await fetch(requestUrl);

      if (!response.ok) {
        throw new Error("Request Failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (error) {
      alert(error.message);
    }
    setIsLoading(false);
  }, []);

  return {
    sendRequest,
    isLoading,
  };
}

export default useHttp;
