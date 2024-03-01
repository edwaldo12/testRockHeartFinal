import axios from "axios";

export default function apiAdapter(baseUrl: string) {
  return axios.create({
    baseURL: baseUrl,
    timeout: 5000,
  });
}
