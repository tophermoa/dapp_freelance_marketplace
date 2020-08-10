import React from 'react';
import CariProject from 'pages/CariProject';
import Tawaran from 'pages/Tawaran';

class DataC extends React.Component{
	constructor(){
		super();
		this.state={
			selectedData:{
				judul: "",
				deskripsi: "",
				estimasi: "",
				budget: "",
				kategori: "",
				level: "",
				owner: ""
			}
		}
		this.getData=this.getData.bind(this);
	}

	getData(datanyacoy){
		this.setState({selectedData: datanyacoy});
	}

	render(){
		return(
			<div>
				<CariProject getData={this.getData} />
				<Tawaran datanyacoy={this.state.selectedData} />
			</div>
		)
	}

}

export default DataC;