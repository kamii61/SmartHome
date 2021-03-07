import React, { useState, useEffect } from "react";
import Device from "./Device";
import ModalDevice from "./ModalDevice";
import { itemService } from "../../services/";
import { connect } from "react-redux";
import { bytesToBase64 } from "./ByteToBase64";
import { DOMAIN } from "../../util/setting";

// socket
import { io } from "socket.io-client";
const socket = io.connect(`${DOMAIN}/Room`, {
  transports: ["websocket", "polling", "flashsocket"],
});

function DeviceList() {
  const [img, setImg] = useState({
    topic: "image",
    message: "http://picsum.photos/200/200",
  });

  //get items
  const getItemList = () => {
    itemService
      .getItems()
      .then((res) => {
        this.props.dispatch({
          type: "FETCH_ITEM",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
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
    });
    console.log("arrBuff", img.message);

    socket.on("connect", () => {
      console.log("socket connected");
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <ModalDevice />
          <span>ADD DEVICE</span>
        </div>
      </div>

      <div className="row mt-3">
        <div class="card text-white">
          <img class="card-img-top" src={img.message} alt="topic" />
          <div class="card-body">
            <h4 class="card-title">ESP Cam</h4>
          </div>
        </div>
      </div>

      {/* device list */}
      <div className="row mt-3">
        {/* {this.renderItem()} */}
        <Device />
      </div>
    </div>
  );
}

// get data from redux
const mapStateToProps = (state) => ({
  itemList: state.ItemReducer.itemList,
});

export default connect(mapStateToProps)(DeviceList);
