import type { AxiosInstance } from 'axios'
import axios from 'axios'

const apiClient: AxiosInstance = axios.create({
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiClient
