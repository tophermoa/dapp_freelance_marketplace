import React from 'react'
import {register} from 'functions/UserFunctions'
import {NavLink} from 'react-router-dom';
import swal from 'sweetalert'

class Register extends React.Component{
	constructor(){
		super()
		this.state={
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		}
		this.onChange=this.onChange.bind(this)
		this.onSubmit=this.onSubmit.bind(this)
	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value})
	}

	onSubmit(e){
		e.preventDefault()

		const user={
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password
		}

		register(user).then((res) =>{
			// swal({
			// 	title: "Berhasil Daftar",
			// 	icon: "success"
			// }).then(()=>{
			// 	this.props.history.push('/login')	
			// })
			console.log(res.data.error)
			console.log(res.data)
			// if(res){
			// 	console.log("berhasil register")
			// } else if(err){
			// 	console.log("gagal register")
			// }
		}).catch((err)=>{
			console.log(err.response)
			//console.log("eror kalo kosong")
		})

		
	}

	render(){
		return(
			<div className="logres">
				<div className="form-container">
					<div className="col=md=6 mt-5 mx-auto">
					<form noValidate onSubmit={this.onSubmit}>
						<h1>SILAHKAN DAFTAR</h1>
						<div className="form-group">
							<label htmlFor="firstName">Nama Depan</label>
							<input type="text" className="form-control" name="firstName" placeholder="Masukan Nama Depan Anda" value={this.state.firstName} onChange={this.onChange} />
						</div>
						<div className="form-group">
							<label htmlFor="lastName">Nama Belakang</label>
							<input type="text" className="form-control" name="lastName" placeholder="Masukan Nama Belakang Anda" value={this.state.lastName} onChange={this.onChange} />
						</div>
						<div className="form-group">
							<label htmlFor="email">Alamat Email</label>
							<input type="email" className="form-control" name="email" placeholder="Masukan email disini" value={this.state.email} onChange={this.onChange} />
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="password" className="form-control" name="password" placeholder="Masukan password" value={this.state.password} onChange={this.onChange} />
						</div>
						<button type="submit" className="btn btn-lg btn-primary btn-block">Register</button>
					</form>
					<p>Sudah mempunyai akun? Segera <NavLink to="/login">login</NavLink></p>
					</div>
				</div>
			</div>
		)
	}
}

export default Register;