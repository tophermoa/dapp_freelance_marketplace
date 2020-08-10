import React from 'react';
import './styles.scss'
import SideBar from 'components/SideBar';
import CariProject from 'pages/CariProject.js';

const WCariProject = () => {
	
	return(
		<div id="wrapper">
			<div className="sidenav">
				<SideBar />
			</div>
			<div className="main">
				<CariProject />
			</div>
		</div>
	)
	
}

export default WCariProject;