import React from 'react'
import Web3 from 'web3';
import moment from 'moment';
import Kontrakjson from 'abi/Kontrak.json';
import upload from 'assets/image/upload.png';
import swal from 'sweetalert';
import ipfs from '../ipfs';
import TarikDana from 'components/TarikDana.js';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {ambilDataDownload} from 'core/actions/action-download';


//INI PENARIKAN TUNAI (WITHDRAW) DAN UPLOAD
class UploadBayaran extends React.Component{
	constructor(props){
		super(props);
		this.state={
      		childVisible: false
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
		this.setState({
      		tanggalnya: tglAkhir.toString()
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



	continue = () =>{
		this.props.nextStep();
	}

	back = e =>{
		e.preventDefault();
		this.props.prevStep();
	}

	
	handleUploadChange=(e)=>{
  		e.preventDefault()
  		console.log("capture file")
  		const file = e.target.files[0]
  		const reader = new window.FileReader()
  		reader.readAsArrayBuffer(file)
  		reader.onloadend=()=>{
  			this.setState({buffer: Buffer(reader.result)}, (result)=>{
          console.log("sukses" + result)
        })
  			console.log('buffer '+this.state.buffer)
  		}
  	}
	
	uploadHandler=(e)=>{
		e.preventDefault()

		ipfs.files.add(this.state.buffer, (error,result)=>{
			if(error){
				console.error(error)
				return
			}

			// this.state.semua.methods.setIpfs(result[0].hash)
			// .send({from:this.state.account})
			// .then((r)=>{
			// 	return this.setState({ ipfsHash: result[0].hash })
			// 	console.log("ipfsHash "+ this.state.ipfsHash)
			// }).then((result)=>{
   //      console.log("DISINI KEPANGGIL")
   //    })
			
			// this.setState({ipfsHash: result[0].hash})
			// console.log('ipfshash '+ this.state.ipfsHash)


      const contract = require('truffle-contract');
      const abi = contract(Kontrakjson);

      abi.setProvider(web3.currentProvider);

      web3.eth.getAccounts((error, accounts) => {
        abi.deployed().then((instance) => {
          return instance.setIpfs(result[0].hash,{
            from: accounts[0],
            gas: 900000
          }).then((r) => {
            return this.setState({ ipfsHash: result[0].hash })
            console.log("ipfsHash "+ this.state.ipfsHash)
          }).then((result)=>{
            this.setState(prevState => ({ childVisible: !prevState.childVisible }));
            this.props.diSelectDownload(this.state.ipfsHash);
            console.log("DISINI KEPANGGIL")
            console.log(this.props.diSelectDownload)
            console.log(this.props.ngegetDataDownload)
          })
        })
      })


		})




		

		// const contract = require('truffle-contract');
  //   	const abi = contract(Kontrakjson);

  //   	abi.setProvider(web3.currentProvider);

  //   	web3.eth.getAccounts((error, accounts) => {
  //     	abi.deployed().then((instance) => {
  //       	return instance.pay({
  //         	from: accounts[0],
  //         	gas: 220000
  //      	 	}).then((result) => {
  //         		console.log("result "+result);
  //       	})
  //     	})
  //   	})

	}
	



	render(){
		const tanggalberakir = this.state.tanggalnya;
		const d = new Date(tanggalberakir * 1000);
		//const valuenya = {values}
		return(
			<div>
			<div>
				<h1 className="mb-5 sih1">Upload dan Pembayaran</h1>
				<div className="align-items-center">				
					<img className="mb-5 sih1" src={upload}/>
				</div>
				<div>Upload File</div>
				<div>
					<input type="file" onChange={this.handleUploadChange}/>
      				<button className="btn btn-success" type="button" onClick={this.uploadHandler}>Upload</button>
				</div>
				<div>
					{this.state.childVisible ? <TarikDana lanjut={this.continue} /> : null}
				</div>	
      			<br />

      			<div className="text-right">
      				<button className="btn btn-primary" onClick={this.continue}>Selesai</button>
      			</div>
			</div>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		ngegetDataDownload: state.ngegetDataDownload
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
		// kalo nya class, pake event.target.value
		// actions:{
		// 	diSelectDownload: bindActionCreators(ambilData, dispatch)
		// }
		diSelectDownload: (data) => {dispatch(ambilDataDownload(data))}
		//diSelectDownload: (baru) => {dispatch({type: 'INCREMENT', baru: baru})}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadBayaran);