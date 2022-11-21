import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

export const fetchRooms = () => axios.get(`${URL}/rooms`)
export const bookRoom = (payload) => axios.post(`${URL}/rooms`, payload)
