import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/Actions/ClientAction";
import "./ModalLogin.css";

export default function ModalSignIn() {
  return (
    <>
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary btn-lg"
          data-toggle="modal"
          data-target="#modelId"
        >
          Sign In
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="modelId"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body card-login">
                <div className="container-fluid">
                  <div className="row no-gutter">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-login" />
                    <div className="col-md-8 col-lg-6">
                      <div className="login d-flex align-items-center py-5">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-9 col-lg-8 mx-auto">
                              <h3 className="login-heading mb-4">
                                Welcome back!
                              </h3>
                              <form>
                                <div className="form-label-group">
                                  <input
                                    type="email"
                                    id="inputEmail"
                                    className="form-control"
                                    placeholder="Email address"
                                    required
                                    autofocus
                                  />
                                  <label htmlFor="inputEmail">
                                    Email address
                                  </label>
                                </div>
                                <div className="form-label-group">
                                  <input
                                    type="password"
                                    id="inputPassword"
                                    className="form-control"
                                    placeholder="Password"
                                    required
                                  />
                                  <label htmlFor="inputPassword">
                                    Password
                                  </label>
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck1"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customCheck1"
                                  >
                                    Remember password
                                  </label>
                                </div>
                                <button
                                  className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                  type="submit"
                                >
                                  Sign in
                                </button>
                                <div className="text-center">
                                  <a className="small" href="#">
                                    Forgot password?
                                  </a>
                                </div>

                                <hr className="my-4" />
                                <button
                                  className="btn btn-lg btn-google btn-block text-uppercase"
                                  type="submit"
                                >
                                  <i className="fab fa-google mr-2" /> Sign up
                                  with Google
                                </button>
                                <button
                                  className="btn btn-lg btn-facebook btn-block text-uppercase"
                                  type="submit"
                                >
                                  <i className="fab fa-facebook-f mr-2" /> Sign
                                  up with Facebook
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
