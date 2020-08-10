import React from 'react';
import 'assets/styles/stylesHome.css';
import NavBar from 'components/NavBar';
import ButtonHome from 'components/ButtonHome';
import Section1 from 'components/Section1';
import Section2 from 'components/Section2';
import Section3 from 'components/Section3';

class Home extends React.Component{
	render(){
		return(
		<div className="page-top">

        <NavBar />

        <ButtonHome />
        
        <Section1 />

        <Section2 />
        
        
        
        <div className="copyright py-4 text-center text-white">
            <div className="container"><small>Copyright © Dapp Marketplace 2020</small></div>
        </div>
        <div className="scroll-to-top d-lg-none position-fixed">
            <a className="js-scroll-trigger d-block text-center text-white rounded" href="#page-top"><i className="fa fa-chevron-up"></i></a>
        </div>
      </div>
		)
	}
}

export default Home