import React, { Component } from "react";
import "./Device.css";
import ModalDevice from "./ModalDevice";

export default class Device extends Component {
  render() {
    return (
      <div className="card ">
        <div className="card-title">
          <img
            className="card-img-top"
            src="http://picsum.photos/200/200"
            width="200"
            height="300"
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
          <p className="card-title">Open</p>

          <label className="switch">
            <input type="checkbox" />
            <span className="slider round" />
          </label>
        </div>
      </div>
    );
  }
}
