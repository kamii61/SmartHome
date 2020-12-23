import React, { Component } from "react";
import Device from "./Device";
import ModalDevice from "./ModalDevice";

export default class DeviceList extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            data-toggle="modal"
            data-target="#modelDevice"
          >
            <i class="fa fa-plus-circle">
              <ModalDevice />
            </i>
          </button>
          <span>ADD DEVICE</span>
        </div>
        {/* device list */}

        <div className="row">
          <div className="col-6">
            <Device />
          </div>
          <div className="col-6">
            <Device />
          </div>
        </div>
      </div>
    );
  }
}
