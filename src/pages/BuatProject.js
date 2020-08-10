import React, {PropTypes} from 'react';
import Card from '@material-ui/core/Card';
import SideBar from 'components/SideBar';
import Web3 from 'web3';
import BuatProjectjson from 'abi/BuatProject.json';
import jwt_decode from 'jwt-decode';
import {projects} from 'functions/ProjectFunction';
//import InlineEdit from 'react-edit-inline-textarea';
import walletIcon from 'assets/image/wallet.png';
import user from 'assets/image/user.png';
import search from 'assets/image/search.png';
import swal from 'sweetalert';
import { withRouter } from 'react-router';

class BuatProject extends React.Component{
	
	async componentWillMount(){
    	await this.loadWeb3();
    	await this.loadBlockchainData();
  	}

  	componentDidMount(){
    	const token = localStorage.usertoken
    	const decoded = jwt_decode(token)
      this.setState({
        firstName: decoded.firstName
      })
    }

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

	async loadBlockchainData(){
    	const web3 = window.web3;
    	const accounts = await web3.eth.getAccounts();
    	this.setState({account: accounts[0]});
    	const networkId = await web3.eth.net.getId();
    	const networkData = BuatProjectjson.networks[networkId];
    	console.log(web3);
    	console.log(networkId);
    	console.log(networkData);
    	if(networkData){
      		const buatproject = web3.eth.Contract(BuatProjectjson.abi, networkData.address);
      		this.setState({buatproject});
      		const dataCount = await buatproject.methods.dataCount().call();
      		//console.log(dataCount.toString());
      		//this.setState({loading: false})
      		//console.log(pembayaran)
    	} else {
      		window.alert("Halaman Project belum di deploy ke networknya");
    	}

  	}
  	
	buatProject(judul, deskripsi, estimasi, budget, kategori, level){
		this.state.buatproject.methods.createProject(judul, deskripsi, estimasi, budget, kategori, level)
		.send({from: this.state.account})
		.then((result) => {
          console.log("result "+result);
        })
	}


  logOut(e){
    e.preventDefault();
    localStorage.removeItem('usertoken');
    this.props.history.push('/');
  }
	

	constructor(props){
    super(props);
    this.state={
      //jumlahEth: 0,
      //account: '',
      dataCount: 0,
      datas:[],
      loading: true,
      firstName: ''
    }

    this.buatProject = this.buatProject.bind(this);
    this.logOut=this.logOut.bind(this);
  }

	render(){
		return(
			<div id="content-wrapper" class="d-flex flex-column">
				<div id="content">
        			<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          				<button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            				<i className="fa fa-bars"></i>
          				</button>
          
          			<form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            			<div class="input-group">
              			<input type="text" class="form-control bg-light border-0 small" placeholder="Pencarian..." aria-label="Search" aria-describedby="basic-addon2" />
              			<div class="input-group-append">
                			<button class="btn btn-primary" type="button">
                  			<img src={search}/>
                			</button>
              			</div>
            			</div>
          			</form>

          			<ul className="navbar-nav ml-auto">
            			<li className="nav-item dropdown no-arrow">
              				<div>{this.state.account} <img src={walletIcon} /></div>
            			</li>

            <div className="topbar-divider d-none d-sm-block"></div>
            
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small"></span>
                <img className="img-profile rounded-circle" src={user} />
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <button className="dropdown-item" onClick={this.logOut}>
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </button>
              </div>
            </li>
          </ul>
          {this.state.firstName}
        </nav>
        		<h1 class="h3 mb-0 text-gray-800">Buat Project</h1>
        		<Card>
				<form onSubmit={(event) => {
					event.preventDefault()
					const projectnya={
						judul: this.sijudul.value,
						deskripsi: this.sideskripsi.value,
						estimasi: this.siestimasi.value,
						budget: this.sibudget.value,
						kategori: this.sikategori.value,
						level: this.silevel.value
					}
					projects(projectnya).then(res=> {
            swal({
              title: "Data Berhasil Diposting",
              icon: "success"
            })
						console.log("project berhasil dibuat ke database dan blockchain")
					}).catch((r)=>{
            swal({
              title: "Tipe Data Salah / Data Tidak Boleh Kosong!",
              icon: "error"
            })
          })
					const judul = this.sijudul.value
					const deskripsi = this.sideskripsi.value
					const estimasi = this.siestimasi.value
					const budget = this.sibudget.value
					const kategori = this.sikategori.value
					const level = this.silevel.value
					this.buatProject(judul, deskripsi, estimasi, budget, kategori, level)
				}}>
					
					<div className="form-group">
						<label>
							Judul</label>
							<input type="text" placeholder="Masukan judul Project" className="form-control" ref={(input) => {this.sijudul = input}} />
						
					</div>
					<div className="form-group">
						<label>
							Deskripsi</label>
							<textarea placeholder="Isi deskripsi pekerjaan" className="form-control" ref={(input => {this.sideskripsi = input})} />
						
					</div>
					<div className="form-group">
					{/*harian, mingguan, bulanan, lebih dari 6bulan*/}
						<label>
							Estimasi Waktu</label>
							<input type="text" placeholder="Masukan estimasi waktu lama pengerjaan project" className="form-control" ref={(input) => {this.siestimasi = input}} />
						
					</div>
					<div className="form-row">
					<div className="form-group col-md-2">
						<label>
							Budget</label>
							<input type="text" placeholder="Budget dalam ETH" className="form-control" ref={(input) => {this.sibudget = input}} />
							
					</div>
					<div className="form-group col-md-4">
						<label>
							Kategori Pekerjaan</label>
							<select className="form-control" ref={(input) => {this.sikategori = input}}>
  								<option value="IT & Networking">IT & Networking</option>
  								<option value="Translation">Translation</option>
  								<option value="Content Writing">Content Writing</option>
							</select>
						
					</div>
					<div className="form-group col-md-4">
						<label>
							Level pengalaman</label>
							<select className="form-control" ref={(input) => {this.silevel = input}}>
  								<option value="Beginner">Beginner</option>
  								<option value="Intermediate">Intermediate</option>
  								<option value="Expert">Expert</option>
							</select>
						
					</div>
					</div>
					<input type="submit" className="btn btn-primary" />
				</form>
				</Card>
				</div>
			</div>
		)
	}
}


export default withRouter(BuatProject);