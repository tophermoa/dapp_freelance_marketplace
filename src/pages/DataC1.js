import React from 'react'

class DataC1 extends React.Component{
	constructor(props){
		super(props);
		this.state={
			testing: [
				"sasatu",
				"dudua",
				"titiga"
			]
		}
	}

	render(){
		return(
			<div>
				{this.state.testing.map((data, key) => {
					return (
						<li key={key}>{data}</li>
					)
				})}
			</div>
		)
	}

}

export default DataC1;