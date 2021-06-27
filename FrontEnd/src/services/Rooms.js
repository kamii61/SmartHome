import axios from 'axios';
import { DOMAIN } from '../util/setting';

class RoomService {
  //get all rooms
  getRoom = async () => {
    return await axios({
      method: 'GET',
      url: `${DOMAIN}/rooms`,
    });
  };

  // get room id
  getRoomByID = async (room_id) => {
    return await axios({
      method: 'GET',
      url: `${DOMAIN}/rooms/${room_id}`,
    });
  };

  //delete room
  deleteRoom = async (room_id) => {
    return await axios({
      method: 'DELETE',
      url: `${DOMAIN}/rooms/${room_id}`,
    });
  };

  //add room
  addRoom = async (data) => {
    return await axios({
      method: 'POST',
      url: `${DOMAIN}/rooms`,
      data,
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded / progressEvent.total);
      },
    });
  };

  //edit room
  editRoom = async (room_id, data) => {
    return await axios({
      method: 'PUT',
      url: `${DOMAIN}/rooms/${room_id}`,
      data,
    });
  };
}

export default RoomService;
