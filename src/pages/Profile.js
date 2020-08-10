import React from 'react'
import jwt_decode from 'jwt-decode'
//import {Link, withRouter} from 'react-router-dom';

class Profile extends React.Component{
	constructor(){
		super()
		this.state={
			firstName: "",
			lastName: "",
			email: ""
		}
		this.logOut=this.logOut.bind(this);
	}

	//OTENTIKASI di Users nyambungnya kesini
	componentDidMount(){
		const token = localStorage.usertoken
		const decoded = jwt_decode(token)
		this.setState({
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			email: decoded.email
		})
	}

	logOut(e){
		e.preventDefault();
		localStorage.removeItem('usertoken');
		this.props.history.push('/');
	}

	render(){
		return(
			<div className="container">
				<div className="jumbotron mt-5">
					<div className="col-sm-8 mx-auto">
						<h1>PROFILE</h1>
					</div>
					<table className="table col-md-6 mx-auto">
						<tbody>
							<tr>
								<td>First Name</td>
								<td>{this.state.firstName}</td>
							</tr>
							<tr>
								<td>Last Namme</td>
								<td>{this.state.lastName}</td>
							</tr>
							<tr>
								<td>Email</td>
								<td>{this.state.email}</td>
							</tr>
						</tbody>
					</table>
					<button type="button" onClick={this.logOut}>
					 LOG OUT
					</button>
				</div>
			</div>
		)
	}

}

export default Profile;