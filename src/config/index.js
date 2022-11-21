const publicRuntimeConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  LOCALSTORAGE_TOKEN_NAME: 'token',
}

export const { API_URL, LOCALSTORAGE_TOKEN_NAME } = publicRuntimeConfig
