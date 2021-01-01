import React from "react";
import "./ModalSignUp.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ModalSignUp() {
  const initialValues = {
    client_name: "",
    client_password: "",
    contact: "",
    email: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("value submit: ", values);
    onSubmitProps.setSubmitting(false);
  };

  // const validate = (values) => {
  //   // values.client_name value.client_password values.contact values.email
  //   // error.client_name error.client_password error.contact error.
  //   //error.client_name = "This field is required"
  //   let errors = {};
  //   if (!values.client_name) {
  //     errors.client_name = "required";
  //   }

  //   if (!values.client_password) {
  //     errors.client_password = "required";
  //   }

  //   if (!values.contact) {
  //     errors.contact = "required";
  //   } else if (/[^0-9]/.test(values.contact)) {
  //     errors.contact = "Invalid phone format";
  //   }

  //   if (!values.email) {
  //     errors.email = "required";
  //   } else if (
  //     !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
  //       values.email
  //     )
  //   ) {
  //     errors.email = "Invalid email format";
  //   }
  //   return errors;
  // };

  const regexPhone = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object({
    client_name: Yup.string().required("Required"),
    client_password: Yup.string().required("Required"),
    contact: Yup.string()
      .required("Required")
      .matches(regexPhone, "Invalid phone format"),
    email: Yup.string().required("Required").email("Invalid email format"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema,

    // only show validate when press button submit form
    validateOnBlur: false,
    validateOnChange: false,
  });

  //console.log("form value: ", formik.values);
  console.log(("form errors", formik.errors));
  console.log("formik", formik);
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
          Sign up
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
              <div className="modal-body form-signup">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>

                <div className="row">
                  <div className="col-12 mx-auto">
                    <div className={`card card-signup flex-row my-5`}>
                      <div className="card-img-left d-none d-md-flex">
                        {/* Background image for card set in CSS! */}
                      </div>
                      <div className="card-body ">
                        <h5 className="card-title text-center text-bold">
                          Register
                        </h5>

                        <form
                          className="form-signup"
                          onSubmit={formik.handleSubmit}
                        >
                          {/* username */}
                          <div className="form-label-group">
                            <input
                              type="text"
                              id="inputUserame"
                              className="form-control"
                              placeholder="Username"
                              name="client_name"
                              autofocus
                              onChange={formik.handleChange}
                              value={formik.values.name}
                            />
                            {formik.errors.client_name ? (
                              <p className="text text-danger">
                                {formik.errors.client_name}
                              </p>
                            ) : null}
                          </div>

                          {/* password */}
                          <div className="form-label-group">
                            <input
                              type="password"
                              id="inputPassword"
                              className="form-control"
                              placeholder="Password"
                              name="client_password"
                              onChange={formik.handleChange}
                              value={formik.values.name}
                            />
                            {formik.errors.client_password ? (
                              <p className="text text-danger">
                                {formik.errors.client_password}
                              </p>
                            ) : null}
                          </div>
                          {/* <div className="form-label-group">
                            <input
                              type="password"
                              id="inputConfirmPassword"
                              className="form-control"
                              placeholder="Confirm Password"
                              name="confirmPassword"
                              onChange={formik.handleChange}
                              value={formik.values.name}
                              required
                            />
                          </div> */}

                          {/* phone */}
                          <div className="form-label-group">
                            <input
                              type="text"
                              id="inputPhone"
                              className="form-control"
                              placeholder="Phone"
                              name="contact"
                              onChange={formik.handleChange}
                              value={formik.values.name}
                            />
                            {formik.errors.contact ? (
                              <p className="text text-danger">
                                {formik.errors.contact}
                              </p>
                            ) : null}
                          </div>

                          {/* email */}
                          <div className="form-label-group">
                            <input
                              type="text"
                              id="inputEmail"
                              className="form-control"
                              placeholder="Email address"
                              name="email"
                              onChange={formik.handleChange}
                              value={formik.values.name}
                            />
                            {formik.errors.email ? (
                              <p className="text text-danger">
                                {formik.errors.email}
                              </p>
                            ) : null}
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
                          <button
                            className="btn btn-lg btn-google btn-block text-uppercase"
                            type="submit"
                          >
                            <i className="fab fa-google mr-2" /> Sign up with
                            Google
                          </button>
                          <button
                            className="btn btn-lg btn-facebook btn-block text-uppercase"
                            type="submit"
                            // nếu ko có lỗi thì cho submit
                            disabled={!formik.isValid || formik.isSubmitting}
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
