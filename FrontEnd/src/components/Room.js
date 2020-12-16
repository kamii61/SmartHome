import React, { Component } from "react";

export default class Room extends Component {
  render() {
    return (
      <div>
        {/* room */}
        <div className="card mt-4">
          <img
            className="card-img-top"
            src="http://picsum.photos/200/200"
            width="200"
            height="300"
          />
          <i class="fa fa-times"></i>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <h4>Temperter</h4>
                <p>
                  28 <span>*C</span>
                </p>
              </div>
              <div className="col-6">
                <h4>Huminity</h4>
                <p>150</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
