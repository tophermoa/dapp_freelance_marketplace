import React from 'react';
import SearchBox from 'components/SearchBox.js';
import walletIcon from 'assets/image/wallet.png';
import user from 'assets/image/user.png';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Web3 from 'web3';
import BuatProjectjson from 'abi/BuatProject.json';
import jwt_decode from 'jwt-decode';
import {myProject} from 'functions/ProjectFunction';
import { withRouter } from 'react-router';

class KontrakProject extends React.Component{
	constructor(props){
		super(props)
		this.state={
      		dataCount: 0,
      		myproject: [],
          firstName: ''
		}
    this.logOut=this.logOut.bind(this);
	}

	async componentWillMount(){
    	await this.loadWeb3();
    	await this.loadBlockchainData();
  	}

  	componentDidMount(){
    	const token = localStorage.usertoken
    	const decoded = jwt_decode(token)
    	this.getMyProject()
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
    	//console.log(accounts);
    	const networkId = await web3.eth.net.getId();
    	const networkData = BuatProjectjson.networks[networkId];
    	if(networkData){
      		const buatproject = web3.eth.Contract(BuatProjectjson.abi, networkData.address);
      		this.setState({buatproject});
      		const dataCount = await buatproject.methods.dataCount().call();
      		this.setState({dataCount});
      		//console.log(dataCount.toString());
      		//this.setState({loading: false})
      		//console.log(pembayaran)
      		//Load Data Project
      		for (var i=1; i<= dataCount; i++){
      			const data = await buatproject.methods.datas(i).call();
      			this.setState({
              datas: [...this.state.datas, data]
            
      			})
      		}
      		//console.log(this.state.datas);
    	} else {
      		window.alert("Halaman Project belum di deploy ke networknya");
    	}

  	}



  	getMyProject=()=>{
  		myProject().then(data=>{
        this.setState({
          myproject: [...data]
        },
        ()=>{
          console.log(this.state.myproject)
        })
      })
  	}


    logOut(e){
      e.preventDefault();
      localStorage.removeItem('usertoken');
      this.props.history.push('/');
    }


	render(){
		return(
	<div id="content-wrapper" className="d-flex flex-column">
		<div id="content">
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>
          
          <SearchBox 
            handleInputSearchChange={this.handleInputSearch}
            handleClickSearch={this.handleButton}
          />

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
				<h1 className="h3 mb-0 text-gray-800">Kontrak & Project</h1>
        
        	{this.state.myproject
        	.map((data, key) => {
            return(
            
            <Card>
            <CardActionArea key={key}>
              <div className="card shadow mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
              
              <div className="card-header py-3">
                <h5 className="card-title">{data.judul}</h5>
              </div>
              <h6 className="card-subtitle mb-2 text-muted">{data.estimasi}</h6>
              <div className="card-body">
              <p className="card-text">{data.deskripsi}</p>
              
              <p>{data.postedBy.firstName}</p>
              
              <a className="btn btn-info btn-icon-split btn-sm">
                <span className="text">{data.budget} ETH</span>
              </a>
              {'    '}
              <a className="btn btn-warning btn-icon-split btn-sm">
                <span className="text">{data.kategori}</span>
              </a>
              {'    '}
              <a className="btn btn-danger btn-icon-split btn-sm">
                <span className="text">{data.level}</span>
              </a>
              </div>
              
              </div>
              </div>
            </CardActionArea>
            </Card>
            )
            })}

				</div>
			</div>
		)
	}

}

export default withRouter(KontrakProject);