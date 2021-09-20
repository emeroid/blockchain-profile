import React, { Component } from 'react';

class Header extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0" href="/"
          >
            Block Chain Registration
          </a>
          <p style={{color: 'white'}}>{this.props.account ? this.props.account: 'No address'}</p>
        </nav>
      </div>
    );
  }
}

export default Header;
