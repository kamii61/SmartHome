import React from "react";
import styleSignUp from "./ModalSignUp.module.css";
import GoogleLogin from "react-google-login";

export default function ModalSignUp() {
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };
  return (
    <>
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary btn-xl"
          data-toggle="modal"
          data-target="#modelId"
        >
          Launch
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
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>

                <div className="row">
                  <div className="col-lg-10 col-xl-9 mx-auto">
                    <div
                      className={`card ${
                        styeSignUp.card - signin
                      } flex-row my-5`}
                    >
                      <div className="card-img-left d-none d-md-flex">
                        {/* Background image for card set in CSS! */}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-center text-bold">
                          Register
                        </h5>
                        <form className="form-signin">
                          <div className="form-label-group">
                            <input
                              type="text"
                              id="inputUserame"
                              className="form-control"
                              placeholder="Username"
                              required
                              autofocus
                            />
                          </div>
                          <div className="form-label-group">
                            <input
                              type="email"
                              id="inputEmail"
                              className="form-control"
                              placeholder="Email address"
                              required
                            />
                          </div>

                          <div className="form-label-group">
                            <input
                              type="password"
                              id="inputPassword"
                              className="form-control"
                              placeholder="Password"
                              required
                            />
                          </div>
                          <div className="form-label-group">
                            <input
                              type="password"
                              id="inputConfirmPassword"
                              className="form-control"
                              placeholder="Confirm Password"
                              required
                            />
                          </div>
                          <button
                            className="btn btn-lg btn-primary btn-block text-uppercase btn-register"
                            type="submit"
                          >
                            Register
                          </button>
                          <a
                            className="d-block text-center mt-2 small"
                            href="#"
                          >
                            Sign In
                          </a>
                          <hr className="my-4" />
                          <GoogleLogin
                            clientId="843820121517-gd9pf3qtfq9vl1dkkj51o86kqgtoa31f.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                            buttonText="login"
                          >
                            {/* <button
                              className="btn btn-lg btn-google btn-block text-uppercase"
                              type="submit"
                            >
                              <i className="fab fa-google mr-2" /> Sign up with
                              Google
                            </button> */}
                          </GoogleLogin>
                          <button
                            className="btn btn-lg btn-facebook btn-block text-uppercase"
                            type="submit"
                          >
                            <i className="fab fa-facebook-f mr-2" /> Sign up
                            with Facebook
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
