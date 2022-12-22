import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    apikey: import.meta.env.VITE_API_KEY
  }
})

instance.interceptors.response.use(
  res => res.data,

  error => {
    const { logout } = useAuthStore()

    if (error.response.status === 401) {
      logout()
    }

    return Promise.reject(error)
  }

)

instance.interceptors.request.use(
  config => {
    const { accessToken } = useAuthStore()

    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`
      }
    }

    return config
  }
)

export const useHttp = instance
