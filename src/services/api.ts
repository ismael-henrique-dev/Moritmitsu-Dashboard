import { ENV } from '@/lib/env'
import axios from 'axios'

const API_URL = ENV.API_URL

export const api = axios.create({
  baseURL: API_URL,
})
