import React, {PropTypes} from 'react';
//import Link from '@material-ui/core/Link';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators, compose } from 'redux';
//import {useSelector, useDispatch} from 'react-redux';
//import {increment} from 'core/actions/actions-dataproject';
import {ambilData} from 'core/actions/actions-dataproject';
import configureStore from 'core/store/configureStore';
import SideBar from 'components/SideBar';
import './styles.scss'
import Web3 from 'web3';
import BuatProjectjson from 'abi/BuatProject.json';
import Typo from 'components/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Tawaran from 'pages/Tawaran';
import jwt_decode from 'jwt-decode';
import {getProjects} from 'functions/ProjectFunction';
import SearchBox from 'components/SearchBox.js';
import walletIcon from 'assets/image/wallet.png';
import user from 'assets/image/user.png';
import { withRouter } from 'react-router';

const isSearched = searchTerm => item => item.judul.toLowerCase().includes(searchTerm.toLowerCase());

class CariProject extends React.Component{

	async componentWillMount(){
    	await this.loadWeb3();
    	await this.loadBlockchainData();
  	}

  componentDidMount(){
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.getAllProject()
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


  	constructor(props){
  		super(props)
  		this.state={
  			account: '',
      	dataCount: 0,
    		datas: [],
        projects: [],
    		click: [{nama: "mama"},{nama: "momo"}, {nama: "meme"}, {nama: "mimi"}],
        ui: [],
        jumanji: [],
    		dataBaru: "",
    		loading: true,
        input: '',
        firstName: ''
      		
  		}
  		this.handleClick = this.handleClick.bind(this);
  		this.Pepe = this.Pepe.bind(this);
      this.logOut=this.logOut.bind(this);
  		// const store = configureStore();
  		// store.subscribe(()=>{
  		// 	this.setState({
  		// 		selectedData: store.getState().dataBaru
  		// 	});
  		// });
  	}

  	// componentDidMount(){
  	// 	this.props.diSelect();
  	// }

    getAllProject=()=>{
      getProjects().then(data=>{
        this.setState({
          projects: [...data]
        },
        ()=>{
          console.log(this.state.projects)
        })
      })
    }

    Pepe(){
      const oi = this.state.click
      const ii = this.state.datas
      const obj = {
        oi : {
          ...this.state.datas
      }}
      this.setState({
        jumanji: [...this.state.jumanji, obj]
      });
      const jnj = this.state.click.concat(this.state.datas)
      this.setState({ui: [jnj]})
      console.log(this.state.ui)
      console.log(this.state.datas)

      return (
        <div>
          {jnj.map((e, key) => {
            return (<li key={key}>{e}

            </li>)
          })}
        </div>)
    }

  	handleClick = (data) => {
    	// access to e.target here
    	console.log("dari handleClick = ", data);
    	//this.props.actions.diSelect(data);
    	this.props.diSelect(data);
	}

  handleInputSearch=(event)=>{
    this.setState({
      input: event.target.value
    })
  }

  handleButton(){
    console.log("Searching...")
  }

  logOut(e){
    e.preventDefault();
    localStorage.removeItem('usertoken');
    this.props.history.push('/');
  }

	render(){
		//const store = configureStore();
		// const haha = store.getState().ngegetData.selectedData;
		//const {kumpulandata} = this.state.datas;
		//const count = useSelector(state=>state.ngegetData.count);
  	//const dispatch = useDispatch();
    var grouped = this.state.datas.reduce((h, {judul,deskripsi, estimasi,budget,kategori,level,owner}) => {
  return Object.assign(h, { [judul]:( h[judul] || [] ).concat({deskripsi, estimasi,budget,kategori,level,owner})})
}, {})
    const testing = new Array(this.state.click);
    const juju = this.state.click.concat(this.state.datas);
    console.log(grouped);
    //const tetes = this.state.click.forEach(() => {this.state.click.concat(this.state.datas)})
    console.log(this.state.ui)
    console.log(this.state.jumanji)
    console.log(this.state.projects)
    console.log(this.state.datas)
  	console.log("state lokal =" + this.state.dataBaru);
		console.log("dari this.props.ngegetData = ", this.props.ngegetData);
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
				<h1 className="h3 mb-0 text-gray-800">Cari Project</h1>
        
        <table>
        <tbody>
        {/*{juju.map((e, key) => {
            return (<tr key={key}>
              <td>{e.nama}</td>
              <td>{e.judul}</td>
              <td>{e.deskripsi}</td>
              <td>{e.estimasi}</td>
              <td>{e.budget}</td>
              <td>{e.kategori}</td>
              <td>{e.level}</td>
              <td>{e.owner}</td>
            </tr>)
          })}*/}
          </tbody>
          </table>
				{/*{this.state.testing.map((e, key) => {
					return (
          <NavLink to={`tawaran/${e.id}`}>
          <li key={key} onClick={() => this.handleClick(e)}>{e}</li>
				  </NavLink>
          )
        })}*/}
        
				
        {/*{this.state.datas.map((data, key) => {
					
					return(
						//keynya {data.id} bisa, {key} bisa
						/*
						<tr key={key} onClick={() => this.handleClick(data)}>
							<th scope="row">{data.id.toString()}</th>
							<td>{data.judul}</td>
							<td>{data.deskripsi}</td>
							<td>{data.estimasi}</td>
							<td>{data.budget}</td>
							<td>{data.kategori}</td>
							<td>{data.level}</td>
							<td>{data.owner}</td>
						</tr>
						
            //DISINI ADA KOMENTAR YANG DIHAPUS TADI
						//INI YANG DARI BLOCKCHAIN
						<NavLink to={`tawaran/${data.id}`}>
						
						<Card>
						<CardActionArea key={key} onClick={() => this.handleClick(data)} >
							<p>{data.judul}</p>
							<p>{data.deskripsi}</p>
							<p>{data.estimasi}</p>
							<p>{data.budget}</p>
							<p>{data.kategori}</p>
							<p>{data.level}</p>
							<p>{data.owner}</p>
						</CardActionArea>
						</Card>
						</NavLink>
					)	
				})}*/}
        

        {this.state.projects
          .filter(isSearched(this.state.input))
          .map((data, key) => {
            console.log(data.commentsproject)
            return(
              <NavLink to={`tawaran/${data.id}`} style={{ textDecoration: 'none' }} >
            
            <Card>
            <CardActionArea key={key} onClick={() => this.handleClick(data)} >
              <div className="card shadow mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
              
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
            </NavLink>
            )
            })}
            
				{/*{this.props.ngegetData.toString()}*/}
				{/*{JSON.stringify(haha)}*/}
				{this.state.dataBaru}

				</div>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		ngegetData: state.ngegetData
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
		// kalo nya class, pake event.target.value
		// actions:{
		// 	diSelect: bindActionCreators(ambilData, dispatch)
		// }
		diSelect: (data) => {dispatch(ambilData(data))}
		//diSelect: (baru) => {dispatch({type: 'INCREMENT', baru: baru})}
	}
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(CariProject);