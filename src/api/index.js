import axios from 'axios'

const URL = 'https://hotel-management-hdang09.herokuapp.com'

export const fetchRooms = () => axios.get(`${URL}/rooms`)
export const bookRoom = (payload) => axios.post(`${URL}/rooms`, payload)
