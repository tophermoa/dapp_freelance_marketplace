import React from 'react';
import { Link } from 'react-router-dom';
import etherLogo from 'assets/image/ethereum.png';

const ButtonHome = () => {
	/*
	constuctor(props) {
    	this.routeChange = this.routeChange.bind(this);
  	}

  	routeChange() {
    	let path = `/reviewcontract`;
    	this.props.history.push(path);
  	}
*/
	/*
	state = {
    redirect: false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/reviewcontract' />
    }
  }
  */

	
		return(
		<div className="button-luar">
		<header className="masthead bg-primary text-white text-center">
			<div className="container d-flex align-items-center flex-column">
			<img className="img-home-icon" src={etherLogo}/>


			<h1 className="masthead-heading text-uppercase mb-0">Decentralized Freelancing Marketplace</h1>
			<div className="divider-custom divider-light">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon"><i className="fa fa-star"></i></div>
                    <div className="divider-custom-line"></div>
            </div>
			<p className="masthead-subheading font-weight-light mb-0">Berbasis Teknologi Blockchain</p>
			<div className="flex">
				<Link to="/register" className="buttonya">Register</Link>
        {'    '}
				<Link to="/login" className="buttonya">Login</Link>
			</div>
			</div>
		</header>
		</div>
		)
	
}

export default ButtonHome;