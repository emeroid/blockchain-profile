import React, { Component } from 'react';
import './App.css';

class ProfileCreate extends Component {

  render() {
    return (
        <div>
              <form className="my-7" onSubmit={(event) => {
                event.preventDefault();
                const firstName = this.first_name.value;
                const lastName = this.last_name.value;
                this.props.createProfile(firstName, lastName);
                }
              }>
              <div class="form-group">
              <label for="first_name">First Name</label>
              <input 
                type="text" 
                class="form-control" 
                id="first_name" 
                ref={(input) => {this.first_name = input}}
                aria-describedby="emailHelp" 
                placeholder="Enter First Name"/>
              </div>
              <div class="form-group">
              <label for="last_name">Last Name</label>
              <input 
                type="text" 
                class="form-control" 
                id="last_name" 
                ref={(input) => {this.last_name = input}}
                placeholder="Enter Last Name"/>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
  }
}

export default ProfileCreate;
