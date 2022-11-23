const publicRuntimeConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  LOCALSTORAGE_TOKEN_NAME: 'token',
};

export const { API_URL, CLIENT_ID, LOCALSTORAGE_TOKEN_NAME } = publicRuntimeConfig;
