import axios from 'axios'

const URL = 'https://hotel-management-hdang09.herokuapp.com'
// const URL = 'http://localhost:5000'

export const fetchRooms = () => axios.get(`${URL}/rooms`)
export const bookRoom = (payload) => axios.post(`${URL}/rooms`, payload)
