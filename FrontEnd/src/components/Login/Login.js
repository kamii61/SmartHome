import React from 'react';
import './Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { clientService } from '../../services';
import { ACCESS_TOKEN, USER_LOGIN } from '../../util/setting';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const initialValues = {
    email: '',
    client_password: '',
  };

  let history = useHistory();

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);

    clientService
      .login(values)
      .then((res) => {
        console.log('success login', res.data);
        localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(res.data));

        history.push('/item');
      })
      .catch((err) => {
        alert('sai r má :)');
        console.log(err);
      });
  };

  const validationSchema = Yup.object({
    client_password: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Invalid email format'),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,

    // only show validate when press button submit form
    validateOnBlur: false,
    validateOnChange: false,
  });

  console.log(('form errors', formik.errors));

  return (
    <>
      <div className='modal-body card-login'>
        <div className='container-fluid'>
          <div className='row no-gutter'>
            <div className='d-none d-md-flex col-md-4 col-lg-6 bg-login' />
            <div className='col-md-8 col-lg-6'>
              <div className='login d-flex align-items-center py-5'>
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-9 col-lg-8 mx-auto'>
                      <h3 className='login-heading mb-4'>Welcome back!</h3>
                      <form onSubmit={formik.handleSubmit}>
                        {/* email */}
                        <div className='form-label-group'>
                          <input
                            type='text'
                            id='inputEmail'
                            className='form-control'
                            placeholder='Email address'
                            autofocus
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                          />
                          <label htmlFor='inputEmail'>Email address</label>
                          {formik.errors.email ? (
                            <p className='text text-danger'>
                              {formik.errors.email}
                            </p>
                          ) : null}
                        </div>

                        {/* password */}
                        <div className='form-label-group'>
                          <input
                            type='password'
                            id='inputPassword'
                            className='form-control'
                            placeholder='Password'
                            name='client_password'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                          />
                          <label htmlFor='inputPassword'>Password</label>
                          {formik.errors.client_password ? (
                            <p className='text text-danger'>
                              {formik.errors.client_password}
                            </p>
                          ) : null}
                        </div>
                        <div className='custom-control custom-checkbox mb-3'>
                          <input
                            type='checkbox'
                            className='custom-control-input'
                            id='customCheck1'
                          />
                          <label
                            className='custom-control-label'
                            htmlFor='customCheck1'
                          >
                            Remember password
                          </label>
                        </div>
                        <button
                          className='btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2'
                          type='submit'
                        >
                          Sign in
                        </button>
                        <div className='text-center'>
                          <a className='small' href='#'>
                            Forgot password?
                          </a>
                        </div>

                        <hr className='my-4' />
                        <button
                          className='btn btn-lg btn-google btn-block text-uppercase'
                          type='submit'
                        >
                          <i className='fab fa-google mr-2' /> Sign up with
                          Google
                        </button>
                        <button
                          className='btn btn-lg btn-facebook btn-block text-uppercase'
                          type='submit'
                        >
                          <i className='fab fa-facebook-f mr-2' /> Sign up with
                          Facebook
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
    </>
  );
}
