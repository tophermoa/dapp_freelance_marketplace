import React from 'react';
import Web3 from 'web3';
import moment from 'moment';
import Kontrakjson from 'abi/Kontrak.json';
import ipfs from '../ipfs';
import axios from 'axios';
//import DatePicker from "react-datepicker";
//import TimePicker from "react-time-picker";
import 'react-datepicker/dist/react-datepicker.css';
import {MuiPickersUtilsProvider, DatePicker,TimePicker} from "material-ui-pickers";
import DateMomentUtils from "@date-io/moment";
import TarikDana from 'components/TarikDana.js'
//import {TimePicker} from "material-ui-pickers";
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
// import DatePicker from 'material-ui/DatePicker';
// import TimePicker from 'material-ui/TimePicker';
// import TextField from 'material-ui/TextField';
// import Snackbar from 'material-ui/Snackbar';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';

class KontrakGabungan extends React.Component{

	constructor(props){
		super(props);
		this.state={
			dateTime: new Date(),
			time: new Date(),
			jumlahEth: 0,
			account: '',
			semua: '',
			buffer: null,
			ipfsHash: '',
      datanya: null,
      childVisible: false
		}
	}

	// componentDidMount () {
 //    	const script = document.createElement("script");

 //    	script.src = "https://ipfs.io/ipfs/<hash-of-lib>/ipfs-downloader.js";
 //    	script.async = true;

 //    	document.body.appendChild(script);
	// }

	//PAKE COMPONENTWILLMOUNT TERPISAH ASYNCNYA JUGA BISA. 
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
    console.log(tglAkhir)
    this.setState({
      datanya: tglAkhir.toString()
    })
    console.log(this.state.datanya)

		//IPFS
		// const contract = require('truffle-contract');
  //   	const abi = contract(Kontrakjson);

  //   	abi.setProvider(web3.currentProvider);

  //   	web3.eth.getAccounts((error, accounts) => {
  //     	abi.deployed().then((instance) => {
  //       	return instance.handShake({
  //         	from: accounts[0],
  //         	gas: 220000
  //      	 	}).then((result) => {
  //         		console.log("result "+result);
  //       	})
  //     	})
  //   	})

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
            console.log("DISINI KEPANGGIL")
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


	downloadHandler=(e)=>{
		e.preventDefault()
		const FileDownload = require('js-file-download')

		// axios.get(`https://ipfs.io/ipfs/QmPsn1TD3e26akJKELYaidpcQChCtZt5XXiRFSDFps5jR8`)
  //  		.then((response) => {
  //       	FileDownload(response.data, 'file.pdf');
  //  		});


		axios({
  				url: `https://ipfs.io/ipfs/${this.state.ipfsHash}`,
  				method: 'GET',
  				responseType: 'blob', // important
			}).then((response) => {
   				const url = window.URL.createObjectURL(new Blob([response.data]));
   				const link = document.createElement('a');
   				link.href = url;
   				link.setAttribute('download','file.jpg'); //or any other extension
   				document.body.appendChild(link);
   				link.click();
			});



		// ipfs.get("QmPsn1TD3e26akJKELYaidpcQChCtZt5XXiRFSDFps5jR8", (err, result)=>{
		// 	console.log(result)
		// 	// files.map((file)=>{
		// 	// 	console.log(file.path)
		// 	// 	console.log(file.content)
		// 	// })

			
		// })

		// axios.get('https://ipfs.io/ipfs/QmPsn1TD3e26akJKELYaidpcQChCtZt5XXiRFSDFps5jR8',{
		// 		responseType: 'blob'
		// 	})
		// 	.then((response)=>{
		// 		console.log((response))
		// 		const url = window.URL.createObjectURL(new Blob([response.data]))
		// 		const link = document.createElement('a')
		// 		link.href = link
		// 		link.setAttribute('download','image.jpg')

		// 	})
	}



	//LANGSUNG DI CREATECONTRACTHANDLER ASYNCNY BISA
	createContractHandler=()=>{
		const sidateTime = this.state.dateTime.unix();
		const sitime = this.state.time.unix();
		console.log(sidateTime);
		console.log(sitime);

		//INI HARUS ASYNC FUNCTION DAN SET NETWORK, WEB3, ID, DLL BANYAK DAH
		//PANGGIL PAKE "METHODS.FUNCTION" SAMA KAYA DI DAPPUNIVERSITY
		// const web3 = new Web3(window.web3.currentProvider);

		// const accounts = await web3.eth.getAccounts();

		// const networkId = await web3.eth.net.getId();
		// const networkData = Kontrakjson.networks[networkId];
		// const semua = web3.eth.Contract(Kontrakjson.abi, networkData.address);

		this.state.semua.methods.createContract(sidateTime)
		.send({
			from: this.state.account,
			data: Kontrakjson.bytecode,
			gas: 220000
		})
		.then((result)=>{
			console.log(result);
		})


		//INI TANPA ASYNC
		//INI SETNYA SEDIKIT PANGGIL BISA PAKE "FUNCTION.SENDTRANSACTION"
	// 	const contract = require('truffle-contract')
 //    	const abi = contract(Kontrakjson);
 //    	abi.setProvider(web3.currentProvider);

 //    	web3.eth.getAccounts((error, accounts) => {
 //        	abi.deployed().then((instance) => {

 //            	console.log("Processing" );
 //            	return instance.createContract.sendTransaction(sidateTime,{
 //                	from: accounts[0],
 //                	gas: "220000"})
 //            	.then((result) => {
 //                	console.log("result: " + result);
 //        		})
 //    		})
 //    	})


 		// const contract = require('truffle-contract');
   //  	const abi = contract(Kontrakjson);

   //  	abi.setProvider(web3.currentProvider);

   //  	web3.eth.getAccounts((error, accounts) => {
   //    	abi.deployed().then((instance) => {
   //      	return instance.createContract(sidateTime,{
   //        	from: accounts[0],
   //        	gas: 220000
   //     	 	}).then((result) => {
   //        		console.log("result "+result);
   //      	})
   //    	})
   //  	})


	}

	depositHandler=()=>{
		this.state.semua.methods.deposit()
		.send({
			from: this.state.account,
			value: web3.toWei(this.state.jumlahEth),
			gas: 220000
		})
		.then((result)=>{
			console.log(result);
		})



		// const contract = require('truffle-contract');
  //   	const abi = contract(Kontrakjson);

  //   	abi.setProvider(web3.currentProvider);

  //   	web3.eth.getAccounts((error, accounts) => {
  //     	abi.deployed().then((instance) => {
  //       	return instance.deposit({
  //         	from: accounts[0],
  //         	gas: 220000
  //      	 	}).then((result) => {
  //         		console.log("result "+result);
  //       	})
  //     	})
  //   	})


	}

	handShakeHandler=()=>{
		// this.state.semua.methods.handShake()
		// .send({
		// 	from: this.state.account,
		// 	gas: 220000
		// })
		// .then((result)=>{
		// 	console.log(result);
		// })



		//Kalo gabisa gassnya digedein coy (220000) + sendTransaction
		const contract = require('truffle-contract');
    	const abi = contract(Kontrakjson);

    	abi.setProvider(web3.currentProvider);

    	web3.eth.getAccounts((error, accounts) => {
      	abi.deployed().then((instance) => {
        	return instance.handShake({
          	from: accounts[0],
          	gas: 220000
       	 	}).then((result) => {
          		console.log("result "+result);
        	})
      	})
    	})


  // 		const address = "0x5dd2c4E2f87A4A4BfeE571635c8711F7159f1Efc";
  //   	const semua = web3.eth.contract(Kontrakjson.abi).at(address);
	
		// //INI PAKE FUNCTION YANG DIBUAT DI SOLIDITYNYA
		
  //   	semua.handShake({
  //   		from: web3.eth.accounts[0],
  //   		gas: 220000
  //   	},
  //   	function(err,res){
  //   		if(!err){
  //   			console.log(res);
  //   		} else {
  //   			console.log(err);
  //   		}
  //  		})
	



	}


	bayarHandler=()=>{

		// const web3 = new Web3(window.web3.currentProvider);

		// const accounts = await web3.eth.getAccounts();

		// const networkId = await web3.eth.net.getId();
		// const networkData = Kontrakjson.networks[networkId];
		// const semua = web3.eth.Contract(Kontrakjson.abi, networkData.address);


		// this.state.semua.methods.pay()
		// .send({
		// 	from: this.state.account,
		//	gas: 220000
		// })
		// .then((result)=>{
		// 	console.log(result);
		// })


		const contract = require('truffle-contract');
    	const abi = contract(Kontrakjson);

    	abi.setProvider(web3.currentProvider);

    	web3.eth.getAccounts((error, accounts) => {
      	abi.deployed().then((instance) => {
        	return instance.pay({
          	from: accounts[0],
          	gas: 220000
       	 	}).then((result) => {
          		console.log("result "+result);
        	})
      	})
    	})



  //   	const address = "0x5dd2c4E2f87A4A4BfeE571635c8711F7159f1Efc";
  //   	const semua = web3.eth.contract(Kontrakjson.abi).at(address);
	
		// //INI PAKE FUNCTION YANG DIBUAT DI SOLIDITYNYA
		
  //   	semua.pay.sendTransaction({
  //   		from: web3.eth.accounts[0],
  //   		gas: 3000000
  //   	},
  //   	function(err,res){
  //   		if(!err){
  //   			console.log(res);
  //   		} else {
  //   			console.log(err);
  //   		}
  //  		})





	}


	cancelHandler=()=>{
		this.state.semua.methods.cancel()
		.send({
			from: this.state.account,
			gas: 220000
		})
		.then((result)=>{
			console.log(result);
		})

		// const contract = require('truffle-contract');
  //   	const abi = contract(Kontrakjson);

  //   	abi.setProvider(web3.currentProvider);

  //   	web3.eth.getAccounts((error, accounts) => {
  //     	abi.deployed().then((instance) => {
  //       	return instance.cancel({
  //         	from: accounts[0],
  //         	gas: 220000
  //      	 	}).then((result) => {
  //         		console.log("result "+result);
  //       	})
  //     	})
  //   	})

	}


	completeHandler=()=>{
		this.state.semua.methods.complete()
		.send({
			from: this.state.account,
			gas: 220000
		})
		.then((result)=>{
			console.log(result);
		})
	}





  	handleSubmit(event){
    	let momentTime = moment(this.state.time);
    	let momentDate = moment(this.state.date);
    	console.log(momentTime)
    	console.log(momentDate)
    }

    handleDepositChange=(event)=>{
    	this.setState({
    		jumlahEth: event.target.value
    	})
    }

	handleDateChange = newdate => {
    	this.setState({
      	dateTime: newdate,
      	time: newdate
    	});
    	console.log(this.state.dateTime);
    	console.log(this.state.time);
  	};


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


	render(){
		console.log(this.state.dateTime) //Thu Jul 23 2020 17:50:11 GMT+0700 (Western Indonesia Time)
		console.log(this.state.time)
		// console.log(a.unix())
		// console.log(b.unix())
    const waktu1 = moment();    //Moment {_isAMomentObject: true, _isUTC: false, _pf
		const waktu = moment().unix()   //1595500812
		const waktu2 = moment.unix()  //Moment {_isAMomentObject: true, _isUTC: false, _pf
		const waktu3 = moment().toDate()  //Thu Jul 23 2020 17:40:12 GMT+0700 (Western Indonesia Time)
    //const waktu4 = moment().unix().toDate() //error
    //const waktu5 = moment().getDate() //error
		// const a = this.state.date
		const b = this.state.time
    console.log(waktu1)
		console.log(waktu)
		console.log(waktu2)
		console.log(waktu3)
    const endTimeStamp = this.state.datanya;
    const d = new Date(endTimeStamp * 1000); //Thu Jul 23 2020 21:43:39 GMT+0700 (Western Indonesia Time)
    const tglberakir = d.toString(); 
    console.log(endTimeStamp)
    console.log(d)
    console.log(tglberakir)
		return(
			<div>
        {this.state.childVisible ? <TarikDana /> : null}
				<label>Tanggal berakhir Kontrak</label>
        <p>tes getCreateContract</p>
        <div dangerouslySetInnerHTML={{__html: d}}></div>
				<div>
				<MuiPickersUtilsProvider utils={DateMomentUtils}>
					<div>
					<DatePicker
        				clearable
        				value={this.state.dateTime}
        				placeholder="Input tanggalnya"
        				onChange={this.handleDateChange}
        				minDate={new Date()}
        				format="MM/dd/yyyy"
      				/>
      				</div>
      				<div>
      				<label>Tanggal</label>
      					<div>
      						<TimePicker
      							placeholder="Input waktunya"
        						value={this.state.dateTime}
        						onChange={this.handleDateChange}
      						/>
      					</div>
      				</div>
      			</MuiPickersUtilsProvider>
      			<button onClick={this.createContractHandler}>Buat Kontrak</button>
      			</div>
      			<div>
      				<label>Deposit terlebih dahulu</label>
      				<div>
      					<input type="text" name="deposit" placeholder="Deposit terlebih dahulu" onChange={this.handleDepositChange} />
      					<button type="button" onClick={this.depositHandler}>Deposit</button>
      				</div>
      			</div>
      			<div>
      				<label>handshake</label>
      				<div>
      					<button type="button" onClick={this.handShakeHandler}>Konfirmasi</button>
      				</div>
      			</div>
      			<div>
      				<h3>Misal sudah lewat tenggat waktu</h3>
      				<div>
      					<label>Upload File</label>
      					<img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} />
      					<div>
      						<input type="file" onChange={this.handleUploadChange}/>
      						<button type="button" onClick={this.uploadHandler}>Upload</button>
      						<button type="button" onClick={this.downloadHandler}>Download</button>
      						<a href="https://ipfs.io/ipfs/QmPsn1TD3e26akJKELYaidpcQChCtZt5XXiRFSDFps5jR8">File 4</a>
      						<button type="button" onClick={this.cancelHandler}>Cancel</button>
      					</div>
      				</div>
      				<div>
      					<label>Tarik dana</label>
      					<div>
      						<button type="button" onClick={this.bayarHandler}>Bayar</button>
      						<button type="button" onClick={this.completeHandler}>Complete</button>
      					</div>
      				</div>
      			</div>
      		</div>
		)
	}
}

export default KontrakGabungan;