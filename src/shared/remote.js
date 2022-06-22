import axios from "axios";

class Remote {
  constructor() {
    axios.interceptors.response.use((value) => {
      if (value.statusText !== "OK") {
        throw new Error("Request Failed!");
      }

      return value;
    });
  }

  get(url) {
    return axios.get(url);
  }

  post(url, payload) {
    return axios.post(url, payload);
  }
}

export const remote = new Remote();
