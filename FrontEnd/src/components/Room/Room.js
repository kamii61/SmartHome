import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ModalEditRoom from './ModalEditRoom';
import { roomService } from '../../services/';
import { DOMAIN } from '../../util/setting';

// socket
import { io } from 'socket.io-client';
const socket = io.connect(`${DOMAIN}/Room`, {
  transports: ['websocket', 'polling', 'flashsocket'],
});

function Room(props) {
  const { room_id, room_name, room_image } = props.room;
  const [temp, setTemp] = useState({ topic: 'TC', message: 20 });
  const [humi, setHumi] = useState({ topic: 'HUM', message: 80 });

  useEffect(() => {
    socket.on('TC', (msg) => {
      // console.log("msg TC", msg);
      setTemp({ ...temp }, (temp.message = msg));
    });

    socket.on('HUM', (msg) => {
      // console.log("msg HUM", msg);
      setHumi({ ...humi }, (humi.message = msg));
    });

    socket.on('connect', () => {
      console.log('socket connected');
    });
  }, []);

  // Delete room
  const deleteRoom = (room_id) => {
    roomService
      .deleteRoom(room_id)
      .then((res) => {
        // console.log(res.data);
        props.dispatch({
          type: 'DELETE_ROOM',
          payload: res.data,
          room_id,
        });
      })
      .catch((err) => {
        console.log('err delete room list', err);
      });
  };

  // Edit room
  // the first: get data by id
  const getRoomById = (room_id) => {
    roomService
      .getRoomByID(room_id)
      .then((res) => {
        //console.log(res.data);
        props.dispatch({
          type: 'GET_ROOM_ID',
          payload: res.data,
          room_id,
        });
      })
      .catch((err) => {
        console.log('err get by id room list', err);
      });
  };

  return (
    <div className='col-12 col-md-6'>
      {/* room */}

      <div className='card mt-4'>
        <div className='card-header'>
          <h3 className='card-title '>{room_name}</h3>

          <img
            className='card-img-top'
            src={`/images/rooms/${room_image}`}
            alt='room'
            width='200'
            height='300'
          />

          {/* btn edit room */}

          <ModalEditRoom
            getRoomById={getRoomById}
            room_id={room_id}
            getRoomList={props.getRoomList}
          />

          {/* btn remove room */}
          <button
            className='btn btn-danger'
            type='button'
            onClick={() => {
              deleteRoom(room_id);
            }}
          >
            <i className='fa fa-times-circle'></i>
          </button>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-6'>
              <h4>Temperter</h4>
              <p>
                {temp.message} <span>*C</span>
              </p>
            </div>
            <div className='col-6'>
              <h4>Huminity</h4>
              <p>
                {humi.message}
                <span>%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect()(Room);
