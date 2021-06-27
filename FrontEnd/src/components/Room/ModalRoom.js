import React, { useState } from 'react';
import { connect } from 'react-redux';

import { roomService } from '../../services/';

const ModalRoom = (props) => {
  const [room, setRoom] = useState({
    room_name: '',
    room_image: null,
  });

  const onChange = (e) => {
    let { value, name } = e.target;
    const newValues = { ...props.roomRedux.values }; // luu tru lai cac gia tri truoc user da nhap

    newValues[name] = value; // gan gia tri moi cho thuoc tinh dang nhap

    if (e.target.file) {
      setRoom({ room_image: e.target.files[0] });
    }

    setRoom({
      ...room,
      [e.target.name]: value,
    });
    console.log('image', room.room_image);
    props.dispatch({
      type: 'SET_ROOM_REDUX',
      roomRedux: {
        values: newValues,
      },
    });
  };

  // add room
  const onSubmitForm = async (e) => {
    const { room_name, room_image } = room;
    e.preventDefault(); // chặn sự kiện submit của browser

    roomService
      .addRoom({
        room_name,
        room_image: room_image.replace(/C:\\fakepath\\/i, ''),
      })
      .then((response) => {
        console.log(response.data);
        props.dispatch({
          type: 'ADD_ROOM',
          payload: response.data,
          room: props.roomRedux.values,
        });
        props.getRoomList();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* Button trigger modal */}
      <button
        type='button'
        className='btn btn-primary btn-lg'
        data-toggle='modal'
        data-target='#modelRoom'
      >
        <i class='fa fa-plus'></i>
      </button>
      {/* Modal */}
      <div
        className='modal fade'
        id='modelRoom'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='modelTitleId'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Room</h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmitForm}>
                <div className='form-group'>
                  <label htmlFor='ID'>ID</label>
                  <input
                    type='text'
                    className='form-control'
                    name='room_id'
                    disabled
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='Name'>Name room</label>
                  <input
                    type='text'
                    className='form-control'
                    name='room_name'
                    value={room.room_name}
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <div className='row' style={{}}>
                    <label htmlFor='Image' className='col-2'>
                      Image
                    </label>
                    <input
                      type='file'
                      className='col-10'
                      name='room_image'
                      value={room.room_image}
                      onChange={onChange}
                    />
                  </div>
                  <div id='image-show' />
                </div>
                <button type='submit' className='btn btn-success mr-3'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  roomList: state.RoomReducer.roomList,
  roomRedux: state.RoomReducer.roomRedux,
  roomEdit: state.RoomReducer.roomEdit,
});

export default connect(mapStateToProps)(ModalRoom);
