import { takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions'
import * as api from '../../api'

function* fetchRoomsSaga(action) {
  try {
    const rooms = yield call(api.fetchRooms)
    yield put(actions.getRooms.getRoomsSuccess(rooms.data))
  } catch (err) {
    console.error('Error: ', err)
    yield put(actions.getRooms.getRoomsFailure(err))
  }
}

function* bookRoomSaga(action) {
  try {
    const room = yield call(api.bookRoom, action.payload)
    yield put(actions.bookRoom.bookRoomSuccess(room.data))
  } catch (err) {
    console.error('Error: ', err)
    yield put(actions.bookRoom.bookRoomFailure(err))
  }
}

function* mySaga() {
  yield takeLatest(actions.getRooms.getRoomsRequest, fetchRoomsSaga)
  yield takeLatest(actions.bookRoom.bookRoomRequest, bookRoomSaga)
}

export default mySaga
