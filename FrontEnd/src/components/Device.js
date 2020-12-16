import React, { Component } from "react";
import styleDevice from "./Device.module.css";

export default class Device extends Component {
  render() {
    return;
    <div className="card text-white bg-primary">
      <img className="card-img-top" src="http://picsum.photos/200/200" alt />
      <div className="card-body">
        <p className="card-title">Open</p>

        <label className={`${styleDevice["switch"]}`}>
          <input type="checkbox" />
          <span className={`${styleDevice[("slider", "round")]}`} />
        </label>
      </div>
    </div>;
  }
}
