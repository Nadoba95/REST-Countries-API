import { useCallback, useState } from "react";
import { remote } from "../shared/remote";

export function useHttpAll() {
  const sendRequest = useCallback(async (requestUrl) => {
    try {
      const response = await remote.get(requestUrl);

      return response.data;
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
      const response = await remote.get(requestUrl);

      applyData(response.data);
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
