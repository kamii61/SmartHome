import React, { Component } from "react";

export default class DeviceList extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <i class="fa fa-plus-circle"></i>
            <span>Add</span>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    );
  }
}
