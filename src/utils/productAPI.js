import { post, get, put } from './apiCaller'

// Admin API
export const getAllRoom = () => {
  const url = '/rooms'
  return get(url)
}

export const bookRoom = (room = {}) => {
  const url = '/rooms'
  return post(url, {}, {}, room)
}

export const updateRoom = (room = {}) => {
  const url = '/rooms/update'
  return put(url, {}, {}, room)
}
