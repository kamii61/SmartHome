import React, { useState, useEffect } from "react";
import "./Device.css";

// socket
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:8080/Room", {
  transports: ["websocket", "polling", "flashsocket"],
});

export default function Device(props) {
  //let { item_name } = this.props.item;
  const [ledStatus, setLedStatus] = useState(0);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
    });
  }, []);

  // onChange input
  const handleChange = (e) => {
    let { checked } = e.target;
    setLedStatus(checked);

    if (!checked) {
      setLedStatus(1);
      console.log("ledStatus", ledStatus);
    } else {
      setLedStatus(0);
      console.log("ledStatus", ledStatus);
    }

    var json = {
      led: ledStatus,
    };
    console.log("json", json);
    socket.emit("LED", json);
  };

  return (
    <div className="card mr-5 mt-3">
      <div className="card-title">
        <img
          className="card-img-top"
          src="http://picsum.photos/200/200"
          width="200"
          height="300"
          alt="img"
        />

        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#modelDevice"
        >
          <i class="fa fa-edit"></i>
        </button>

        <button className="btn btn-danger">
          <i class="fa fa-times-circle"></i>
        </button>
      </div>
      <div className="card-body">
        <p className="card-title">open</p>

        <label className="switch">
          <input
            type="checkbox"
            name="led"
            value={ledStatus}
            onChange={handleChange}
          />
          <span className="slider round" />
        </label>
      </div>
    </div>
  );
}
