import React, { Component } from "react";

export default class ModalUser extends Component {
  render() {
    return (
      <div>
        <div>
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-primary btn-lg"
            data-toggle="modal"
            data-target="#modelUser"
          >
            <i class="fa fa-home"></i>
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="modelUser"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="container-fluid">
                    <form>
                      <div>
                        <div className="mb-3 form-group">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            ID
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="id"
                          />
                        </div>
                        <div className="mb-3 form-group">
                          <label className="form-label">User name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="userName"
                          />
                        </div>

                        <div className="mb-3 form-group">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                          />
                        </div>
                        <div className="mb-3 form-group">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                          />
                        </div>

                        <div className="mb-3 form-group">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Phone
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            name="phone"
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
