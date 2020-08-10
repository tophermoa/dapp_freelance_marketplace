import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import configureStore from 'core/store/configureStore';
import CariProject from 'pages/CariProject';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {NavLink, Link, Redirect} from 'react-router-dom';
import {comments, getComments} from 'functions/CommentBidFunction';
import {commentss, getCommentss, penawardb, getProjects} from 'functions/ProjectFunction';
import jwt_decode from 'jwt-decode';
import Web3 from 'web3';
import Penawaranjson from 'abi/Penawaran.json';
import swal from 'sweetalert';
import walletIcon from 'assets/image/wallet.png';
import user from 'assets/image/user.png';
import search from 'assets/image/search.png';
import Kontrak from 'components/Kontrak.js';
import { withRouter } from 'react-router';


class Tawaran extends React.Component {

	//Blockchain disini
	async componentWillMount(){
    	await this.loadWeb3();
    	await this.loadBlockchainData();
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
    	const networkData = Penawaranjson.networks[networkId];
    	if(networkData){
      		const penawaran = web3.eth.Contract(Penawaranjson.abi, networkData.address);
      		this.setState({penawaran});
      		const dataCount = await penawaran.methods.dataCount().call();
      		this.setState({dataCount});
      		for (var i=1; i<= dataCount; i++){
      			const data = await penawaran.methods.datas(i).call();
      			this.setState({
              datas: [...this.state.datas, data]
            
      			})
      		}
    	} else {
      		window.alert("Halaman belum di deploy ke networknya");
    	}

  	}
  	
	Penawaran=(tawar)=>{
		this.state.penawaran.methods.createPenawaran(tawar)
		.send({from: this.state.account})
		.then(function(result){
          console.log("BERHHASIL "+result);
        })

    
	}


	//Masuk FRONT END

	constructor(){
		super();
		this.state={
			dataBaru: {
				postedBy: "",
				judul: "",
				deskripsi: "",
				estimasi: "",
				budget: "",
				kategori: "",
				level: "",
				owner: ""
			},
			inipenawaran: '',
			account: '',
			datas: [],
			komentar: '',
			comments: [],
			initext: '',
			projectId: '',
			inicomment: [],
			projects: [],
			firstName: ''
		}
		this.onChange=this.onChangeKomentar.bind(this)
		this.onChangeComment=this.onChangeComment.bind(this)
		this.onClick=this.onClick.bind(this)
		this.onComment=this.onComment.bind(this)
		this.Penawaran=this.Penawaran.bind(this)
		this.onChangePenawaran=this.onChangePenawaran.bind(this)
		this.onPenawaran=this.onPenawaran.bind(this)
		this.logOut=this.logOut.bind(this);
		//this.tampilData = this.tampilData.bind(this);
	}

	//TAMPIL DATA NYOBA BUAT NAMPILIN
	//TAPI GATAU CARA NAMPILIN LANGSUNG GIMANA
	//UDA BISA KE PASSING JUGA DARITADI
	// componentWillMount=()=>{
	// 	this.setState({
	// 		dataBaru: this.props.ngegetData
	// 	})
	// 	//console.log("ini data baru di tampilData= ", this.state.dataBaru)
	// 	//return (<div>testing</div>)
	// }

	componentDidMount=()=>{
		//return(<div>statenya = {this.state.komentar}</div>)
		this.getAllComment();
		this.getAllProject();
		const token = localStorage.usertoken
    	const decoded = jwt_decode(token)
  		console.log(this.state.comments)
  		this.setState({
			dataBaru: this.props.ngegetData,
			firstName: decoded.firstName
		})
	}

	getAllComment=()=>{
		getCommentss().then(data=>{
			//var copydata= {...data};
			//var sidata = Object.assign({}, data)
			//var jadistr = data.toString();
			this.setState(
			{
				initext: '',
				inicomment: [...data]
			},
			()=>{
				console.log(this.state.inicomment)
			}
			)
		})
	}

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

	onChangePenawaran(e){
		this.setState({inipenawaran: e.target.value})
	}

	onChangeKomentar(e){
		this.setState({[e.target.name]: e.target.value})
	}

	onChangeComment(e){
		this.setState({initext: e.target.value})
	}

	onPenawaran(e){
		e.preventDefault();
		const sitawar = this.state.inipenawaran;
		this.Penawaran(sitawar)

		// const projectId = this.state.dataBaru._id
		// const iniidtawar = this.state.datas.id.toString()
		// const iniowner = this.state.datas.owner

  //       penawardb(iniidtawar, iniowner, projectId).then(res => {
		// 	console.log('Komentar berhasil (halamanbaru)')
		// })

		swal({
			title: "Berhasil Tawar",
			icon: "success"
		})
		
	}

	async konfirmasiOnClick(){
		if (!await confirm('Anda yakin dengan worker ini?')) {
    		return;
		}
		window.location.reload()
      	//return this.props.history.push("/kontrak")		
	}
	



	onClick(e){
		e.preventDefault();
		const comment={
			userComment: this.state.komentar
		}
		comments(comment).then(res => {
			//this.getAllComment()
			console.log('Komentar berhasil (halamanbaru)')
		})
	}

	onComment(e){
		e.preventDefault();
		// const comment={
		// 	initext: this.state.initext,
		// 	projectId: this.state.projectId
		// }
		// commentss(comment).then(res => {
		// 	console.log('Komentar berhasil (halamanbaru)')
		// })
		// const comments={
		// 	initext:this.state.initext,
		// 	projectId: this.state.dataBaru._id	
		// }
		const projectId = this.state.dataBaru._id
		const ini = this.state.initext

        commentss(ini, projectId).then(res => {
        	swal({
				title: "Komentar Ditambah",
				icon: "success"
			})
			console.log('Komentar berhasil (halamanbaru)')
		})
		// .then(result=>{
		// 	console.log("kayanya berhasil")
		// 	const newData = inicomment.map(item=>{
  //           	if(item._id==result._id){
  //               	return result
  //           	}else{
  //               	return item
  //           	}
  //      		})
		// })

	}

	logOut(e){
		e.preventDefault();
		localStorage.removeItem('usertoken');
		this.props.history.push('/');
	}

	// tamData(props){
	// 	return(<div>statenya = {props.dataBaru}</div>)
	// }

	render(){
		// const store = configureStore();
		// const haha = store.getState().ngegetData.selectedData;
		//const baba = this.props.ngegetData
		//console.log("ini juga data baru di render = ", this.state.dataBaru);
		console.log(this.state.comments)
		console.log(this.state.initext)
		console.log(this.state.projectId)
		console.log(this.state.dataBaru)
		console.log(this.state.inicomment)
		console.log(this.state.datas)
		const toto = this.state.datas.id
		const tata = JSON.stringify(toto)
		console.log(tata)
		const cobicobicobi = []
		const cobacoba = Object.entries(this.state.datas)
		const cobicobi = [...this.state.datas]
		for (let cob of cobicobi){
			//cobicobicobi.push({siid: cob.id, siowner:cob.owner});
			cobicobicobi.push([cob.id, cob.owner]);
		}
		console.log(cobicobicobi)
		console.log(cobicobicobi[0])
		console.log(cobacoba.id)
		console.log(cobacoba[0])
		console.log(cobicobi)
		console.log(cobicobi[0])

		const cocolat = []
		Object.keys(cobicobi).forEach((key) => {
			var val = cobicobi[key];
			cocolat.push([val.id, val.owner]);
		});
		console.log(this.props.ngegetData)
		//console.log(this.state.datas[0].id)
		//console.log(this.state.datas[0].owner)
		return(
			<div id="content-wrapper" class="d-flex flex-column">
				{/*<h1>{this.props.match.params.dataId}</h1>*/}
				
				{/*selected data: {this.props.datanyacoy.judul}/ {this.props.datanyacoy.deskripsi}/ {this.props.datanyacoy.estimasi}/ {this.props.datanyacoy.budget} /{this.props.datanyacoy.kategori} /{this.props.datanyacoy.level} /{this.props.datanyacoy.owner}*/}
				
				{/*<h1>{JSON.stringify(haha)}</h1>*/}
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
                  			<img src={search} />
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

        		<h1 class="h3 mb-0 text-gray-800">Penawaran</h1>



				<Card>
					<CardContent>
					<div className="card shadow mb-4">
              			<div className="card border-left-primary shadow h-100 py-2">
              
              			<div className="card-header py-3">
							<h5 className="card-title">{this.state.dataBaru.judul}</h5>
						</div>

						<h6 className="card-subtitle mb-2 text-muted">{this.state.dataBaru.estimasi}</h6>
	
						<p className="card-text">{this.state.dataBaru.deskripsi}</p>
						<p>{this.state.dataBaru.postedBy.firstName}</p>
						<a className="btn btn-info btn-icon-split btn-sm">
							<span className="text">{this.state.dataBaru.budget} ETH</span>
						</a>
						{'    '}
						<a className="btn btn-warning btn-icon-split btn-sm">
							<span className="text">{this.state.dataBaru.kategori}</span>
						</a>
						{'    '}
						<a className="btn btn-danger btn-icon-split btn-sm">
							<span className="text">{this.state.dataBaru.level}</span>
						</a>
						<p>{this.state.dataBaru.owner}</p>
						
						</div>
						</div>
					</CardContent>
				</Card>
				</div>
				{/*<div>
				<Card>
					<CardContent>
						<h2>Komentar</h2>
						<div>
						<table>
						<tbody>
							{this.state.comments.map((data, key) => {
								
								return(
										<tr key={key}>
											<td>{data[1]}</td>
										</tr>
								)
							})}
						</tbody>
						</table>
						</div>
						<div>
							<label>Komentar</label>
							<input type="text" name="komentar" placeholder="komentar disini" value={this.state.komentar} onChange={this.onChangeKomentar} />
						</div>
						<button type="button" onClick={this.onClick}>Komentar</button>
					</CardContent>
				</Card>
				</div>*/}
				<div>
				<Card>
					<CardContent className="card">
					<div className="card shadow mb-4">
              			<div className="card border-bottom-success shadow h-100 py-2">
              			<div className="khusus-tawaran">
						<h2>Comment</h2>
						{/*<div>
						<table>
						<tbody>
							{this.state.comments.map((data, key) => {
								
								return(
										<tr key={key}>
											<td>{data[1]}</td>
											<td>{e.semua[0]._id}</td>
											<td>{e.initext}</td>
										</tr>
								)
							})}
						</tbody>
						</table>
						</div>*/}
						
						<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
        				<tbody>
        					{/*{this.state.inicomment.map((e, key) => {
        						console.log(e)
        						console.log(e.initext)
        						console.log(e.firstName)
            					return (
            						<tr key={key}>
              							<td>{e.initext}</td>
              							<td>{e.postedBy.firstName}</td>
            						</tr>
            					)
          					})}*/}
          					{this.state.projects.map((data, key)=>{

          						return data.commentsproject.map((p)=>{
          								console.log(p)
          								return(
          									<tr key={p._id}>
                      						<td>{p.initext}</td>
                     						<td>{p.postedBy.firstName}</td>
                     						</tr>
          								)
          							});
          						
          					})}
          					</tbody>
          					</table>
						</div>
						<div className="form-group col-md-8">
							<input type="text" className="form-control" name="comment" placeholder="Masukan Komentar" onChange={this.onChangeComment}/>
							<br />
							<button type="button" className="btn btn-primary" onClick={this.onComment}>Comment</button>
						</div>
						
						</div>
						</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="card">
						<div className="card shadow mb-4">
              			<div className="card border-bottom-info shadow h-100 py-2">
						<div className="khusus-tawaran">
							<h2>Penawaran</h2>
							<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
							<tbody>
							{this.state.datas.map((e, key)=>{
								return (
									<NavLink to="/kontrak" onClick={this.konfirmasiOnClick}>
										<tr key={key}>
											<td>{e.id.toString()}</td>
											<td>{e.tawar.toString()} ETH</td>
											<td>{e.owner}</td>
											<td>
												<a class="btn btn-success btn-icon-split btn-sm">
                    								<span class="icon text-white-50">
                      									<i class="fa fa-arrow-right"></i>
                    								</span>
                    								<span class="text">Pilih</span>
                  								</a>
											</td>
										</tr>
									</NavLink>
									)
							})}
							</tbody>
							</table>
						</div>
						
					{/*<form onSubmit={(e)=>{
                                    e.preventDefault()
                                    const tawar = this.sipenawaran.value
                                    this.Penawaran(tawar)
                                }}>
                                  <input type="text" placeholder="add a comment" ref={(input) => {this.sipenawaran = input}} />  
                    </form>*/}
                    <div className="form-group col-md-4">
						{/*<table>
        				<tbody>
        					{this.state.inicomment.map((e, key) => {
            					return (
            						<tr key={key}>
            							<td>{}</td>
              							<td>{}</td>
              							<td>{}</td>
            						</tr>
            					)
          					})}
          				</tbody>
          				</table>*/}
							<input type="text" className="form-control" name="penawaran" placeholder="Berikan penawaran anda" onChange={this.onChangePenawaran}/>
							<br />
							<button type="button" className="btn btn-primary" onClick={this.onPenawaran}>Tawar</button>
					</div>
				</div>
				</div>
					</CardContent>
				</Card>
				</div>
				{/*<div>
					<form onSubmit={(e)=>{
                                    e.preventDefault()
                                    const idnya= this.state.dataBaru._id
                                    console.log(idnya)

                                    commentss(e.target[0].value,idnya).then(res => {
										console.log('Komentar berhasil (halamanbaru)')
									})
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                    </form>
				</div>*/}
			</div>
		)	
	}
}

const mapStateToProps = (state) => {
	return{
		ngegetData: state.ngegetData
	}
}

export default compose(withRouter, connect(mapStateToProps))(Tawaran);