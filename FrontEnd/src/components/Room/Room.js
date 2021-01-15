import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ModalEditRoom from "./ModalEditRoom";
import { roomService } from "../../services/";
import { DOMAIN } from "../../util/setting";
import { bytesToBase64 } from "./ByteToBase64";

// socket
import { io } from "socket.io-client";
const socket = io.connect(`${DOMAIN}/Room`, {
  transports: ["websocket", "polling", "flashsocket"],
});

function Room(props) {
  let { room_id, room_name } = props.room;
  const [temp, setTemp] = useState({ topic: "TC", message: 20 });
  const [humi, setHumi] = useState({ topic: "HUM", message: 80 });
  const [img, setImg] = useState({
    topic: "image",
    message: "http://picsum.photos/200/200",
  });

  useEffect(() => {
    socket.on("TC", (msg) => {
      // console.log("msg TC", msg);
      setTemp({ ...temp }, (temp.message = msg));
    });

    socket.on("HUM", (msg) => {
      // console.log("msg HUM", msg);
      setHumi({ ...humi }, (humi.message = msg));
    });

    socket.on("image", (msg) => {
      // b1: get unit8Array of arrayBuffer
      var uint8View = new Uint8Array(msg);
      //console.log(uint8View);

      // b2: covert unit8Array to base64
      var unit8ToBase64 = bytesToBase64(uint8View);
      //console.log("base64", unit8ToBase64);

      setImg(
        { ...img },
        (img.message = "data:image/jpeg;base64," + unit8ToBase64)
      );
      console.log("arrBuff", img.message);
    });

    socket.on("connect", () => {
      console.log("socket connected");
    });
  }, []);

  // Delete room
  const deleteRoom = (room_id) => {
    roomService
      .deleteRoom(room_id)
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
    roomService
      .getRoomByID(room_id)
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
          <img src={img.message} />
          <img
            className="card-img-top"
            src="http://picsum.photos/200/200"
            width="200"
            height="300"
          />

          {/* btn edit room */}

          <ModalEditRoom
            getRoomById={getRoomById}
            room_id={room_id}
            getRoomList={props.getRoomList}
          />

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
