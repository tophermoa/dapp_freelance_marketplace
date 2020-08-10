import React from 'react';
import Web3 from 'web3';
import moment from 'moment';
import Kontrakjson from 'abi/Kontrak.json';
import timer from 'assets/image/timer.png';
import swal from 'sweetalert';
import { withRouter } from 'react-router';

class BerjalanKontrak extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
		}
		this.pekerjaanSelesaiHandler=this.pekerjaanSelesaiHandler.bind(this);
    this.cancelHandler=this.cancelHandler.bind(this);
    this.cancelHandlerJuga=this.cancelHandlerJuga.bind(this);
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



	continue = e =>{
		this.props.nextStep();
	}

	back = e =>{
		e.preventDefault();
		this.props.prevStep();
	}

  async cancelHandlerJuga(){
    try{
          let result = await swal({
              title: 'Anda yakin ingin batalkan kontrak?',
              text: "Biaya deposit akan refund",
              icon: 'warning',
              buttons: true,
              dangerMode: true
          }).then((result)=>{
            if(result){
              this.cancelHandler();
            } else {
              console.log("DiCancel")
            }
          })
      }catch(e){
          // Fail!
          console.error(e);
      }
  }

	cancelHandler=()=>{
		const contract = require('truffle-contract');
    	const abi = contract(Kontrakjson);

    	abi.setProvider(web3.currentProvider);

    	web3.eth.getAccounts((error, accounts) => {
      	abi.deployed().then((instance) => {
        	return instance.cancel({
          	from: accounts[0],
          	gas: 900000
       	 	}).then((result) => {
            swal({
                title: "Kontrak Dibatalkan!",
                icon: "success"
              }).then((a)=>{
                window.location.reload()
              })
          		console.log("result "+result);
        	}).catch((error)=>{
        		swal({
       	 				title: "Anda Bukan Project Owner",
       	 				text: "Selain Project Owner tidak dapat membatalkan kontrak",
       	 				icon: "error"
       	 			})
        	})
      	})
    	})
	}

	async pekerjaanSelesaiHandler(){
		try{
      		let result = await swal({
      		    title: 'Anda yakin sudah selesai?',
      		    text: "Lanjutkan upload dan terima bayaran",
      		    icon: 'warning',
      		    buttons: true,
          		dangerMode: true
      		}).then((result)=>{
      			if(result){
     		 		return this.props.nextStep();
      			} else {
      				console.log("DiCancel")
      			}
      		})
   		}catch(e){
   		    // Fail!
   		    console.error(e);
   		}
	}



	render(){
		const tanggalberakir = this.state.tanggalnya;
		const d = new Date(tanggalberakir * 1000);
		//const valuenya = {values}
		console.log(this.props.values)

		return(
			<div>
			<div>
				<h1 className="mb-5 sih1">Onprogress...</h1>
					
				<img className="mb-5 sih1" src={timer}/>
				<div>Kontrak sedang berjalan</div>
				<div>Mohon selesaikan project terlebih dahulu sampai :</div>
				<div dangerouslySetInnerHTML={{__html: d}}></div>
					
      			<br />

      			<div className="text-right">
              <button className="btn btn-danger" onClick={this.cancelHandlerJuga}>Batalkan Kontrak</button>
              {'    '}
      				<button className="btn btn-primary" onClick={this.pekerjaanSelesaiHandler}>Selesai</button>
      			</div>
			</div>
			</div>
		)
	}
}

export default withRouter(BerjalanKontrak);