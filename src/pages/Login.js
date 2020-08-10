import React from 'react'
import {login} from 'functions/UserFunctions'
import {NavLink} from 'react-router-dom'
import swal from 'sweetalert'

class Login extends React.Component{
	constructor(){
		super()
		this.state={
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
			email: this.state.email,
			password: this.state.password
		}

		login(user).then(res =>{
			console.log(res.errortidakterdaftar)		//User belum mengisi

			if(res.errortidakdaftar){
				swal({
					title: "Pengguna tidak terdaftar",
					icon: "error"
				})
				//this.props.history.push('/cariproject')
				console.log("ini login")
			} else if(res.errorbelumngisi){
				swal({
					title: "Username / Password belum diisi",
					icon: "error"
				})
			} else {
				this.props.history.push('/cariproject')
      			window.location.reload()
			}
		}).catch((err)=>{
			if(err){
			swal({
				title: "Error",
				text: "Username atau Password salah!",
				icon: "error"
			})
			}
		})
	}

	render(){
		return(
			<div className="logres">
				<div className="form-container">
					<div className="mt-5 mx-auto">
					<form noValidate onSubmit={this.onSubmit}>
						<h1>SIGN IN</h1>
						<div className="form-group">
							<label htmlFor="email">Alamat Email</label>
							<input type="email" className="form-control" name="email" placeholder="Masukan email disini" value={this.state.email} onChange={this.onChange} />
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="password" className="form-control" name="password" placeholder="Masukan password" value={this.state.password} onChange={this.onChange} />
						</div>
						<button type="submit" className="btn btn-lg btn-primary btn-block">Sign in</button>
					</form>
					<p>Belum mempunyai akun? Segera <NavLink to="/register">daftar</NavLink></p>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;