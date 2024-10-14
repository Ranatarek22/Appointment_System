// import React from 'react'
import axios from "axios";

export const BASE_URL = "https://rentty-beta.fly.dev";
// export const API_URL = BASE_URL.concat("/users");

const apiInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export { apiInstance };
