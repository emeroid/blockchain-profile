import React, { Component } from 'react';
import Web3 from 'web3';
//import logo from '../logo.png';
import './App.css';
import Register from '../abis/Register.json';
import Header from './Header';

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchain();
  }

  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    }else{
      alert('No ethereum browser detected, consider installing metaMask chrome plugin');
    }
  }

  async loadBlockchain(){
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    this.setState({account: account[0]});
    const networkId = await web3.eth.net.getId();
    const networkData = Register.networks[networkId];
    //console.log(networkData);
    if(networkData){
      const registration = web3.eth.Contract(Register.abi, networkData.address);
      this.setState({registration});
      const profileId = await registration.methods.profileId.call();
      this.setState({ profileCount: profileId});

      const profile = await registration.methods.getProfile(this.state.account).call();
      //console.log(profile);
      //Get All transactions;
      this.setState({profiles: profile});
      //this.state.profiles.map(e => console.log(e));
      for(var i = 0; i < this.state.profiles; i++ ){
        //const profile = await registration.methods.Profiles.call();
        //this.setState({profiles: [...this.state.profiles, profile]});
        console.log(this.state.profiles.length);
      }
      //console.log(this.state.profiles);

    }else{
      window.alert('Registration contract not deployed to this network');
    }
    
  }

  constructor(props){
    super(props);
    this.state = {
      account: '',
      profileCount: 0,
      profiles: [],
      loading: false,
      price: '',
    }

    this.createProfile  = this.createProfile.bind(this);
  }

   createProfile(firstName, lastName){
      //, gasPrice: window.web3.utils.fromWei(this.state.gasFee.toString(), 'Ether'), gas: 1000000
      if(!this.state.profiles){
        this.state.registration.methods.createProfile(firstName, lastName).send({from: this.state.account, value: window.web3.utils.toWei('0.01', 'ether')})
        .then((error, resp) => {
              console.log(error, resp);
        });
      }else{
          window.alert('You can only create one profile');
      }
  }

  render() {
    return (
      <div>
        <Header account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1 className="h3 mb-8"> Registration Profile </h1>
                <form className="my-7" onSubmit={(event) => {
                      event.preventDefault();
                      const firstName = this.first_name.value;
                      const lastName = this.last_name.value;
                      this.createProfile(firstName, lastName);
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
            </main>
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
                      <th scope="row"></th>
                      <td>{this.state.profiles.firstname}</td>
                      <td>{this.state.profiles.lastname}</td>
                      <td></td>
                    </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
