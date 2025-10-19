import axios from "axios"

export const api = axios.create({
  baseURL: "https://morimitsu-dashboard-api.onrender.com",
})