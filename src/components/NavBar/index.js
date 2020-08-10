import React from 'react'
import './styles.scss'
import { Link } from "react-scroll";
import blockchainLogo from 'assets/image/blockchain.png'

class NavBar extends React.Component{
	state = {};
	render(){
		return(
			<nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <div className="container">
                <a className="navbar-brand js-scroll-trigger" href="#page-top">
                	<img className="img-icon" src={blockchainLogo} /> Dapp Marketplace
                </a>
                <button className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fa fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#portfolio">Apa itu Blockchain?</a></li>
                        <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#about">Ethereum</a></li>
                    </ul>
                </div>
            </div>
        </nav>




			/*
			<nav className="navbar" id="navbar">
				<div className="navbar-content">
					<ul className="navbar-item">
						<li className="navbar-item"><Link
					    activeClass="active"
					    to="section1"
					    spy={true}
					    smooth={true}
					    offset={0}
					    duration= {500}>Section 1</Link></li>
						<li className="navbar-item"><Link
					    activeClass="active"
					    to="section2"
					    spy={true}
					    smooth={true}
					    offset={0}
					    duration= {500}>Section 2</Link></li>
						<li className="navbar-item"><Link
					    activeClass="active"
					    to="section3"
					    spy={true}
					    smooth={true}
					    offset={0}
					    duration= {500}>Section 3</Link></li>
					</ul>
				</div>
			</nav>
			*/
			/*
			<div className="navbar">
				
					<Link
					    activeClass="active"
					    to="section1"
					    spy={true}
					    smooth={true}
					    offset={0}
					    duration= {500}>Section 1</Link>
					<Link
					    activeClass="active"
					    to="section2"
					    spy={true}
					    smooth={true}
					    offset={0}
					    duration= {500}>Section 2</Link>
					<Link
					    activeClass="active"
					    to="section3"
					    spy={true}
					    smooth={true}
					    offset={0}
					    duration= {500}>Section 3</Link>
				
			</div>
			*/
		)
	}
}

export default NavBar;