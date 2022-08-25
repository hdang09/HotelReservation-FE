import { getType, getRooms, bookRoom } from '../actions'

const INIT_STATE = {
  rooms: {
    isLoading: false,
    data: [],
  },
}

export default function roomsReducer(state = INIT_STATE.rooms, action) {
  switch (action.type) {
    case getType(getRooms.getRoomsRequest): // case 'getRoomsRequest'
      return {
        ...state,
        isLoading: true,
      }
    case getType(getRooms.getRoomsSuccess): // case 'getRoomsSuccess'
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }
    case getType(getRooms.getRoomsFailure): // case 'getRoomsFailure'
      return {
        ...state,
        isLoading: false,
      }
    case getType(bookRoom.bookRoomSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      }
    default:
      return state
  }
}
