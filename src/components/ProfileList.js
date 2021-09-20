import React, { Component } from 'react';
import './App.css';

class ProfileList extends Component {

  render() {
    return (
        <div>
            <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Profile ID</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.profiles.map((profile, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{profile.firstname}</td>
                            <td>{profile.lastname}</td>
                            <td>{profile.userId.toString()}</td>
                          </tr>
                        )
                    })
                  }
                </tbody>
            </table>
        </div>
    );
  }
}

export default ProfileList;
