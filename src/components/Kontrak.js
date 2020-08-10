import React from 'react'
import TglKontrak from 'pages/TglKontrak.js'
import DepositKontrak from 'pages/DepositKontrak.js'
import KonfirmasiKontrak from 'pages/KonfirmasiKontrak.js'
import BerjalanKontrak from 'pages/BerjalanKontrak.js'
import UploadBayaran from 'pages/UploadBayaran.js'
import TerimaHasil from 'pages/TerimaHasil.js'
import TarikDana from 'components/TarikDana.js'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { MuiThemeProvider }   from '@material-ui/core/styles'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

class Kontrak extends React.Component{
	constructor(props){
		super(props)
		this.state={
			step: 0
		}
		this.cobaRoute=this.cobaRoute.bind(this);
		this.getStepContent=this.getStepContent.bind(this);
		this.cobaRouteJuga=this.cobaRouteJuga.bind(this);
		this.handleBackToHome=this.handleBackToHome.bind(this);
	}

	nextStep=()=>{
		const {step} = this.state
		this.setState({
			step: step+1
		})
	}

	prevStep=()=>{
		const {step} = this.state
		this.setState({
			step: step - 1
		})
	}

	// inputChange = input => e => {
	// 	this.setState({
	// 		[input]: e.target.value
	// 	})
	// }

	cobaRoute=(e)=>{
		e.preventDefault();
		return(<KonfirmasiKontrak />)
	}

	cobaRouteJuga=(e)=>{
		e.preventDefault();
		return(<TarikDana />)
	}


	getSteps(){
  		return ['Waktu Kontrak Berakhir', 'Deposit', 'Konfirmasi', "Kontrak Berjalan", "Pengiriman", "Penarikan"];
	}

	

	getStepContent=()=>{
		const {step} = this.state;
		switch(step){
			case 0:
			return(
				<TglKontrak
					nextStep={this.nextStep}
					inputChange={this.inputChange}
				/>
			);
			case 1:
			return(
				<DepositKontrak
					nextStep={this.nextStep}
					prevStep={this.prevStep}
				/>
			);
			case 2:
			return(
				<KonfirmasiKontrak
					cobaRoute={this.cobaRoute}
					nextStep={this.nextStep}
					prevStep={this.prevStep}
				/>
			);
			case 3:
			return(
				<BerjalanKontrak
					nextStep={this.nextStep}
					prevStep={this.prevStep}
				/>
			);
			case 4:
			return(
				<UploadBayaran
					nextStep={this.nextStep}
					prevStep={this.prevStep}
				/>
			);
			case 5:
			return(
				<TerimaHasil
					nextStep={this.nextStep}
					prevStep={this.prevStep}
				/>
			);
		}
	}

	handleBackToHome=(e)=>{
		e.preventDefault()
		this.props.history.push("/cariproject")
	}


	render(){
		const steps = this.getSteps();
		const muiTheme = getMuiTheme({
    		stepper: {
    		    bgColor: 'green'
    		}
		})
		return(
			<div className="backgroundnye">
				<div>
				<a class="btn btn-danger btn-icon-split btn-sm btn-kontrak-kanan" onClick={this.handleBackToHome}>
                  	<span class="icon text-white-50">
                    	<i class="fa fa-arrow-left"></i>
                  	</span>
                  	<span class="text">Back To Home</span>
                </a>
				</div>
					<div>
						<div className="khususstepper">
							<Stepper activeStep={this.state.step} alternativeLabel style={{background: "transparent"}}>
        						{steps.map((label) => (
          							<Step key={label}>
            							<StepLabel>{label}</StepLabel>
          							</Step>
        						))}
      						</Stepper>
      					</div>
      					<div className="contract">
      						<div className="form-container">
      							{this.getStepContent()}
      						</div>
      					</div>
      				</div>
			</div>
		)

	}
}

export default withRouter(Kontrak);
