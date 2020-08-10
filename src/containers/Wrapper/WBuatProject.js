import React from 'react';
import './styles.scss';
import SideBar from 'components/SideBar';
import BuatProject from 'pages/BuatProject.js'; 

const WBuatProject = () => {
	
	return(
		<div id="wrapper">
			<div className="sidenav">
				<SideBar />
			</div>
			<div className="main">
				<BuatProject />
			</div>
		</div>
	)
	
}


export default WBuatProject;