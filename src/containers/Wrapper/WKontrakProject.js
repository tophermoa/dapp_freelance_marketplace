import React from 'react';
import './styles.scss';
import SideBar from 'components/SideBar';
import KontrakProject from 'pages/KontrakProject.js'; 

const WKontrakProjecct = () => {
	
	return(
		<div id="wrapper">
			<div className="sidenav">
				<SideBar />
			</div>
			<div className="main">
				<KontrakProject />
			</div>
		</div>
	)
	
}


export default WKontrakProjecct;