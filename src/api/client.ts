import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL ?? "https://moonpig.github.io/tech-test-frontend",
  timeout: 10_000,
});
