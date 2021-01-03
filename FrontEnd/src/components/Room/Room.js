import React, { useState, useEffect } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import ModalEditRoom from "./ModalEditRoom";

// socket
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:8080", {
  transports: ["websocket", "polling", "flashsocket"],
});

function Room(props) {
  let { room_id, room_name } = props.room;
  const [temp, setTemp] = useState({ topic: "TC", message: "20" });
  const [humi, setHumi] = useState({ topic: "HUM", message: "80" });

  useEffect(() => {
    socket.on("TC", (msg) => {
      console.log("msg TC", msg);
      setTemp((temp.message = msg));
    });

    socket.on("HUM", (msg) => {
      // console.log("msg HUM", msg);
      setHumi((humi.message = msg));
    });

    socket.on("connect", () => {
      console.log("socket connected");
    });
  }, []);

  // Delete room
  const deleteRoom = (room_id) => {
    Axios({
      method: "DELETE",
      url: `http://localhost:8080/rooms/${room_id}`,
    })
      .then((res) => {
        // console.log(res.data);
        props.dispatch({
          type: "DELETE_ROOM",
          payload: res.data,
          room_id,
        });
      })
      .catch((err) => {
        console.log("err delete room list", err);
      });
  };

  // Edit room
  // the first: get data by id
  const getRoomById = (room_id) => {
    Axios({
      method: "GET",
      url: `http://localhost:8080/rooms/${room_id}`,
    })
      .then((res) => {
        //console.log(res.data);
        props.dispatch({
          type: "GET_ROOM_ID",
          payload: res.data,
          room_id,
        });
      })
      .catch((err) => {
        console.log("err get by id room list", err);
      });
  };
  return (
    <div>
      {/* room */}

      <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title ">{room_name}</h3>
          <img
            className="card-img-top"
            src="http://picsum.photos/200/200"
            width="200"
            height="300"
          />

          {/* btn edit room */}

          <ModalEditRoom getRoomById={getRoomById} room_id={room_id} />

          {/* btn remove room */}
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => {
              deleteRoom(room_id);
            }}
          >
            <i class="fa fa-times-circle"></i>
          </button>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <h4>Temperter</h4>
              <p>
                {temp.message} <span>*C</span>
              </p>
            </div>
            <div className="col-6">
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
