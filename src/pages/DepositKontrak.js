import React from 'react'
import Web3 from 'web3';
import moment from 'moment';
import Kontrakjson from 'abi/Kontrak.json';
import swal from 'sweetalert';

class DepositKontrak extends React.Component{
	constructor(props){
		super(props);
		this.state={
			jumlahDeposit: 0
		}
	}


	async componentWillMount(){
		await this.init();


	}


	async init(){
		//const web3 = new Web3(window.web3.currentProvider);
		const web3 = new Web3(window.web3.currentProvider);
		await window.ethereum.enable();

		const accounts = await web3.eth.getAccounts();
    	this.setState({account: accounts[0]});

		const networkId = await web3.eth.net.getId();
		const networkData = Kontrakjson.networks[networkId];
		const semua = web3.eth.Contract(Kontrakjson.abi, networkData.address);
		this.setState({semua});

		//IPFS
		// const contract = require('truffle-contract');
  //   	const abi = contract(Kontrakjson);

  //   	abi.setProvider(web3.currentProvider);

  //   	web3.eth.getAccounts((error, accounts) => {
  //     	abi.deployed().then((instance) => {
  //       	return instance.handShake({
  //         	from: accounts[0],
  //         	gas: 900000
  //      	 	}).then((result) => {
  //         		console.log("result "+result);
  //       	})
  //     	})
  //   	})

	}



	continue = e =>{
		e.preventDefault();
		this.props.nextStep();
	}

	back = e =>{
		e.preventDefault();
		this.props.prevStep();
	}

	depositHandler=()=>{
		// this.state.semua.methods.deposit()
		// .send({
		// 	from: this.state.account,
		// 	value: web3.toWei(this.state.jumlahDeposit),
		// 	gas: 900000
		// })
		// .then((result)=>{
		// 	console.log(result);
		// })



		const contract = require('truffle-contract');
    	const abi = contract(Kontrakjson);

    	abi.setProvider(web3.currentProvider);

    	web3.eth.getAccounts((error, accounts) => {
      	abi.deployed().then((instance) => {
        	return instance.deposit({
          	from: accounts[0],
          	value: web3.toWei(this.state.jumlahDeposit),
          	gas: 900000
       	 	}).then((result) => {
       	 		this.props.nextStep();
          		console.log("result "+result);
        	})
      	})
    	})


	}


	handleDepositChange=(event)=>{
    		this.setState({
    			jumlahDeposit: event.target.value
    		})
    }





	render(){
		const {values, inputChange} = this.props;
		//const valuenya = {values}
		console.log(this.props.values)

		return(
			<div>
			<div>
				<h1 className="mb-5 sih1">Deposit</h1>
				<div className="form-group">
					<label htmlFor="deposit">Biaya DP (dalam bentuk ETH)</label>
					<input placeholder="contoh : 2" type="text" className="form-control" name="deposit" onChange={this.handleDepositChange} />
				</div>

      			<br />

      			<div className="text-right">
      				<button className="btn btn-primary" onClick={this.depositHandler}>Continue</button>
      			</div>
			</div>
			</div>
		)
	}
}

export default DepositKontrak;	