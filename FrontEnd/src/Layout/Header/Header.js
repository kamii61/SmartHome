import React, { Component } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
  state = {
    display: 'none',
  };

  // show hide when click btn Sidebar
  showHideSideBar = () => {
    this.state.display === 'none'
      ? this.setState({
          display: 'block',
        })
      : this.setState({
          display: 'none',
        });
  };
  render() {
    return (
      <div>
        <nav className='navbar navbar-expand-sm '>
          <a className='navbar-brand' href='/'>
            <img
              src='/images/logo.png'
              alt='smart-home'
              width='50%'
              height='auto'
              object-fit='scale-down'
            />
          </a>
          <button
            className='navbar-toggler d-lg-none text-white'
            type='button'
            data-toggle='collapse'
            data-target='#collapsibleNavId'
            aria-controls='collapsibleNavId'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse ' id='collapsibleNavId'>
            <ul className='navbar-nav mr-auto mt-2 mt-lg-0 ' id='headerNav'>
              <li className='nav-item active'>
                <NavLink
                  activeStyle={{ color: '#FC77DC' }}
                  exact
                  className='nav-link'
                  to='/'
                >
                  DASH BOARD <span className='sr-only'>(current)</span>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  to='/item'
                  activeStyle={{ color: '#FC77DC' }}
                  exact
                >
                  ITEM
                </NavLink>
              </li>
              <li className='nav-item '>
                <NavLink
                  className='nav-link '
                  to='/about'
                  activeStyle={{ color: '#FC77DC' }}
                  exacts
                >
                  ABOUT US
                </NavLink>
              </li>
            </ul>
            <form className='form-inline my-2 my-lg-0'>
              <input
                className='form-control mr-sm-2'
                type='text'
                placeholder='Search'
              />
              <button
                className='btn btn-outline-success my-2 my-sm-0'
                type='submit'
              >
                Search
              </button>
            </form>
          </div>

          {/* nav second */}
          <div className='btn-navSecond'>
            <button
              className='btn mx-5 text-white '
              onClick={() => {
                this.showHideSideBar();
              }}
            >
              <i className='fas fa-stream' />
            </button>
            <div className='navSecond' style={{ display: this.state.display }}>
              <button
                className='btn rounded-0 text-white bg-dark w-100 p-3`'
                onClick={() => {
                  this.showHideSideBar();
                }}
              >
                <i className='fas fa-stream' />
              </button>
              <div classname='navSecond__info pt-2'>
                <ul className='nav justify-content-center'>
                  <li className='nav-item'>
                    <a className='nav-link text-white' href='#'>
                      <i className='fab fa-facebook-messenger text-white' />
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link text-white' href='#'>
                      <i className='fa fa-map-marker-alt ' />
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link disabled text-white' href='#'>
                      <i className='fa fa-user' />
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link disabled text-white' href='#'>
                      <i className='fa fa-search' />
                    </a>
                  </li>
                </ul>
                <div>
                  <a className='nav-link disabled text-white' href='#'>
                    <i className='fa fa-share-alt' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      </div>
    );
  }
}
