import React from 'react'
import Web3 from 'web3';
import moment from 'moment';
import Kontrakjson from 'abi/Kontrak.json';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

class KonfirmasiKontrak extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
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
		const tglAkhir = await semua.methods.getCreateContract().call();
		const getBalance = await semua.methods.getBalance().call();
		this.setState({
      		tanggalnya: tglAkhir.toString()
    	})
    	this.setState({
    		balancenya: getBalance
    	})
		console.log(tglAkhir)

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

	handShakeHandler=()=>{
		// this.state.semua.methods.handShake()
		// .send({
		// 	from: this.state.account,
		// 	gas: 900000
		// })
		// .then((result)=>{
		// 	console.log(result);
		// })



		//Kalo gabisa gassnya digedein coy (900000) + sendTransaction
		const contract = require('truffle-contract');
    	const abi = contract(Kontrakjson);

    	abi.setProvider(web3.currentProvider);

    	web3.eth.getAccounts((error, accounts) => {
      	abi.deployed().then((instance) => {
        	return instance.handShake({
          	from: accounts[0],
          	gas: 900000
       	 	}).then((result) => {
       	 		swal({
       	 				title: "Kontrak berhasil dibuat!",
       	 				icon: "success"
       	 			}).then((lanjut)=>{
       	 				if(lanjut){
       	 					return this.props.nextStep()
       	 				}
       	 			})
        	}).catch((error)=>{
        		swal({
       	 				title: "Anda Bukan Pekerja",
       	 				text: "Ganti ke alamat wallet pekerja",
       	 				icon: "error"
       	 			})
        	})
      	})
    	})


  // 		const address = "0x5dd2c4E2f87A4A4BfeE571635c8711F7159f1Efc";
  //   	const semua = web3.eth.contract(Kontrakjson.abi).at(address);
	
		// //INI PAKE FUNCTION YANG DIBUAT DI SOLIDITYNYA
		
  //   	semua.handShake({
  //   		from: web3.eth.accounts[0],
  //   		gas: 900000
  //   	},
  //   	function(err,res){
  //   		if(!err){
  //   			console.log(res);
  //   		} else {
  //   			console.log(err);
  //   		}
  //  		})
	



	}





	render(){
		const tanggalberakir = this.state.tanggalnya;
		const balance = this.state.balancenya;
		const balanceEth = balance/1000000000000000000;
		const d = new Date(tanggalberakir * 1000);
		//const valuenya = {values}
		console.log(this.props.values)

		return(
			<div>
			<div>
				<h1 className="mb-5 sih1">Konfirmasi Kontrak Perjanjian</h1>
				
				<p>Tanggal berakir : <div dangerouslySetInnerHTML={{__html: d}}></div></p>
				<p>Tarif Kerja : <div dangerouslySetInnerHTML={{__html: balanceEth}}></div></p>
				<p>Bagikan alamat Link berikut <Link to="/kontrak" onClick={this.props.cobaRoute}>URL</Link> ke Freelancer untuk konfirmasi</p>
      			<br />

      			<div className="text-right">
      				<button className="btn btn-primary" onClick={this.handShakeHandler}>Konfirmasi</button>
      			</div>
			</div>
			</div>
		)
	}
}

export default KonfirmasiKontrak;