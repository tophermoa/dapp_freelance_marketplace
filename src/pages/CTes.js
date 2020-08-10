import React from 'react';

class CTes extends React.Component{
	render(){
		return(
			<div>
				{this.props.children}
				<p>footer CTes</p>
			</div>
		)
	}
}

export default CTes;