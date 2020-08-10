import React from 'react'
import {MuiPickersUtilsProvider, DatePicker,TimePicker} from "material-ui-pickers";
import DateMomentUtils from "@date-io/moment";
import Web3 from 'web3';
import moment from 'moment';
import Kontrakjson from 'abi/Kontrak.json';

class TglKontrak extends React.Component{
	constructor(props){
		super(props);
		this.state={
			dateTime: new Date()
			
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


	handleDateChange = newdate => {
    	this.setState({
      		dateTime: newdate
    	});
    	//const valuenya = {values}
    	console.log(this.state.dateTime);
    	console.log(this.props.values)
  	};


  	createContractHandler=(e)=>{
  		e.preventDefault();

		const sidateTime = this.state.dateTime.unix();
		console.log(this.state.dateTime)
		console.log(sidateTime);

		//INI HARUS ASYNC FUNCTION DAN SET NETWORK, WEB3, ID, DLL BANYAK DAH
		//PANGGIL PAKE "METHODS.FUNCTION" SAMA KAYA DI DAPPUNIVERSITY
		// const web3 = new Web3(window.web3.currentProvider);

		// const accounts = await web3.eth.getAccounts();

		// const networkId = await web3.eth.net.getId();
		// const networkData = Kontrakjson.networks[networkId];
		// const semua = web3.eth.Contract(Kontrakjson.abi, networkData.address);

		// this.state.semua.methods.createContract(sidateTime)
		// .send({
		// 	from: this.state.account,
		// 	data: Kontrakjson.bytecode,
		// 	gas: 900000
		// })
		// .then((result)=>{
		// 	this.props.nextStep();
		// 	console.log(result);
		// })


		//INI TANPA ASYNC
		//INI SETNYA SEDIKIT PANGGIL BISA PAKE "FUNCTION.SENDTRANSACTION"
		const contract = require('truffle-contract')
    	const abi = contract(Kontrakjson);
    	abi.setProvider(web3.currentProvider);

    	web3.eth.getAccounts((error, accounts) => {
        	abi.deployed().then((instance) => {

            	console.log("Processing" );
            	return instance.createContract.sendTransaction(sidateTime,{
                	from: accounts[0],
                	gas: "900000"
                })
            	.then((result) => {
            		this.props.nextStep() //biar pas promises valid langsung pindah halaman 
                	console.log("result: " + result);
        		})
    		})
    	})


 		// const contract = require('truffle-contract');
   //  	const abi = contract(Kontrakjson);

   //  	abi.setProvider(web3.currentProvider);

   //  	web3.eth.getAccounts((error, accounts) => {
   //    	abi.deployed().then((instance) => {
   //      	return instance.createContract(sidateTime,{
   //        	from: accounts[0],
   //        	gas: 900000
   //     	 	}).then((result) => {
   //     	 		this.props.nextStep();		//biar pas promises valid langsung pindah halaman
   //        		console.log("result "+result);
   //      	})
   //    	})
   //  	})


	}



	render(){
		//const valuenya = {values}
		// this.props.values = this.state.dateTime;
		console.log(this.state.dateTime)
		const uu = 1595515419;
		const date = new Date(uu); //tapi ini salah ga akurat
		//console.log(date); //Thu Jul 23 2020 17:40:12 GMT+0700 (Western Indonesia Time)
		//const converter = uu.toDate(); //error

		return(
			<div>
			<div>
				<h1 className="mb-5 sih1">Tanggal Kontrak</h1>
				<div className="form-group">
					<MuiPickersUtilsProvider utils={DateMomentUtils}>
						<div>
						<label htmlFor="tgl">Tanggal Berakir Kontrak</label>
							<div>
							<DatePicker
        						clearable
        						value={this.state.dateTime}
        						placeholder="Input tanggalnya"
        						onChange={this.handleDateChange} //onChange={inputChange(this.handleChange)} //error
        						minDate={new Date()}
        						format="MM/dd/yyyy"
      						/>
      						</div>
      					</div>
      					<div>
      					<label htmlFor="waktu">Pukul</label>
      						<div>
      						<TimePicker
      							placeholder="Input waktunya"
        						value={this.state.dateTime}
        						onChange={this.handleDateChange}
      						/>
      						</div>
      					</div>
      				</MuiPickersUtilsProvider>

      			<br />

      			<div className="text-right">
      				<button className="btn btn-primary" onClick={this.createContractHandler}>Continue</button>
      			</div>
				</div>
			</div>
			</div>
		)
	}
}

export default TglKontrak;