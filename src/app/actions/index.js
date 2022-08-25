import { createActions } from 'redux-actions'

export const getType = (reduxAction) => {
  return reduxAction().type
}

export const getRooms = createActions({
  getRoomsRequest: undefined,
  getRoomsSuccess: (payload) => payload,
  getRoomsFailure: (err) => err,
})

/* 
  {
    type: 'getRoomsSuccess',
    payload: {
      name: 'Test'
    }
  }
*/

export const bookRoom = createActions({
  bookRoomRequest: (payload) => payload,
  bookRoomSuccess: (payload) => payload,
  bookRoomFailure: (err) => err,
})

export const updateRoom = createActions({
  updateRoomRequest: (payload) => payload,
  updateRoomSuccess: (payload) => payload,
  updateRoomFailure: (err) => err,
})
