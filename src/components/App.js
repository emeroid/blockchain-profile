import React, { Component } from 'react';
import web3 from './web3';
//import logo from '../logo.png';
import './App.css';
import register from './register';
//import Register from '../abis/Register.json';
import Header from './Header';

class App extends Component {

  async componentWillMount(){
    //await this.loadWeb3();
    await this.loadBlockchain();
  }
  
  async loadBlockchain(){
    this.setState({loading: true});
    const account = await web3.eth.getAccounts();
    this.setState({account: account[0]});
    const profileId = await register.methods.profileId.call();
    const profile = await register.methods.getProfile(this.state.account).call();
    const isEmpty = profile[0] !== '';
    this.setState({profile, profileId});
    console.log(profile, isEmpty);
    if(isEmpty){
       this.setState({loading: false});
    }
    
  }

  constructor(props){
    super(props);
    this.state = {
      account: '',
      loading: false,
      profileId: 0,
      profile: []
    }
    this.createProfile  = this.createProfile.bind(this);
  }

   createProfile(firstName, lastName){
        const isEmpty = this.state.profile[0] !== '';
        if(firstName === '' || lastName === ''){
           alert('Please fill all fields');
           return;
        }
        if(isEmpty) {
            alert('You have created a profile on this network. Try changing to a new account.');
        }else{

        register.methods.createProfile(firstName, lastName).send({from: this.state.account, value: web3.utils.toWei('0.01', 'ether')})
        .on('transactionHash', function(transactionHash){ 
          console.log(transactionHash) // contains the new contract address
         })
        .on('receipt', function(receipt){
           console.log(receipt.contractAddress) // contains the new contract address with receipt
           
        })
        .on('confirmation', function(confirmationNumber, receipt){ 
          console.log(confirmationNumber, receipt)
          this.setState({loaded: false});
          //return window.location.reload();
        })
        .then(function(newContractInstance){
            console.log(newContractInstance.options.address) // instance with the new contract address
        });
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
                <h1 className="h3 mb-8 mt-9"> Registration Profile </h1>
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
                    {this.state.loading ? <div className="spiner">Your Created Profile will display here shortly........</div> : (<tr>
                      <th scope="row"></th>
                      <td>{this.state.profile[0]}</td>
                      <td>{this.state.profile[1]}</td>
                      <td>{this.state.profileId.toString()}</td>
                    </tr>)}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
