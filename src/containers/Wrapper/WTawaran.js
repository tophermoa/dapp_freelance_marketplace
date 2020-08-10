import React from 'react';
import './styles.scss';
import SideBar from 'components/SideBar';
import Tawaran from 'pages/Tawaran.js'; 

const WTawaran = () => {
	
	return(
		<div id="wrapper">
			<div className="sidenav">
				<SideBar />
			</div>
			<div className="main">
				<Tawaran />
			</div>
		</div>
	)
	
}


export default WTawaran;