import { post, get, put, remove } from './APICaller';

// Rooms
export const getAllRoom = () => {
  const url = '/rooms';
  return get(url);
};

export const bookRoom = (room = {}) => {
  const url = '/rooms';
  return post(url, room);
};

export const getSpecificRoom = (roomNumber = '') => {
  const url = '/rooms/specific';
  return post(url, { roomNumber });
};

export const updateRoom = (room = {}) => {
  const url = '/rooms/update';
  return put(url, room);
};

export const updateStatus = (id, status) => {
  const url = '/rooms/update-status';
  return put(url, { id, status });
};

export const deleteRoom = (id) => {
  const url = '/rooms/delete';
  return remove(url, {}, {}, { id });
};

// Report
export const getReport = () => {
  const url = '/rooms/report';
  return get(url);
};

export const getTodayAvailability = () => {
  const url = '/rooms/report-today';
  return get(url);
};
