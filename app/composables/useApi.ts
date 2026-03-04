export const useApi = () => {
    const config = useRuntimeConfig()
  
    const apiFetch = (url: string, options: any = {}) => {
      const token = import.meta.client ? localStorage.getItem('token') : null
  
      return useFetch(url, {
        baseURL: config.public.apiUrl,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          'x-api-key': '5f43766dcd92b8c3e7639d2a8791063c',
          
        },
        ...options
      })
    }
  
    return { apiFetch }
  }