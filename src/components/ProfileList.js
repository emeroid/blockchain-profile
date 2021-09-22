import React, { Component } from 'react';
import './App.css';

class ProfileList extends Component {

  render() {
      const profile = this.props;
    return (
        <>
            <table class="table" style={{marginTop: 70, padding: 20}}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Profile ID</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{1}</th>
                        <td>{profile.firstname}</td>
                        <td>{profile.lastname}</td>
                        <td>{profile[2].toString()}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
  }
}

export default ProfileList;
