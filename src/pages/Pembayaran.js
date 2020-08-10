import React from 'react';
import Web3 from 'web3';
import Pembayaranjson from 'abi/Pembayaran.json';
import Deposit from '../components/Deposit';

class Pembayaran extends React.Component{
  /*
	async componentWillMount(){
    //await this.loadWeb3();
    await this.loadBlockchainData();
  }

  //load web3nya ke web
  
  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert("Non-ethereum browser detected. You should consider trying Metamask!")
    }
  }
  


  //buat function untuk mengsend ether ke smart contractnya


  //load data2nya yg diperlukan ke web
  async loadBlockchainData(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    //console.log(accounts);
    const networkId=await web3.eth.net.getId();
    const networkData = Pembayaranjson.networks[networkId];
    if(networkData){
      const pembayaran = web3.eth.Contract(Pembayaranjson.abi, networkData.address);
      this.setState({pembayaran});
      //console.log(pembayaran)
    } else {
      window.alert("Pembayaran belum di deploy ke networknya");
    }

  }
  */

  depositHandler=(event)=>{
    event.preventDefault();
    //this.setState({jumlahEth: event.target.value})

    const contract = require('truffle-contract');
    const abi = contract(Pembayaranjson);

    abi.setProvider(web3.currentProvider);

    web3.eth.getAccounts((error, accounts) => {
      abi.deployed().then((instance) => {
        return instance.deposit({
          from: accounts[0],
          value: web3.toWei(this.state.jumlahEth, "ether"),
          gas: 43000
        }).then((result) => {
          console.log("result "+result);
        })
      })
    })


  }

  handleEthChange = (event) => {
    this.setState({
      jumlahEth: event.target.value
    })
  }

  constructor(props){
    super(props);
    this.state={
      jumlahEth: 0,
      //account: '',
      //dataCount: 0,
      //datas:[],
      //loading: true 
    }

    //this.userInputHandler = this.userInputHandler.bind(this);
  }

  render(){
  	return(
  		<div>
        <Deposit handleDeposit={this.depositHandler} ethChange={this.handleEthChange} /> 
          
      </div>
  	)
  }
}

export default Pembayaran;