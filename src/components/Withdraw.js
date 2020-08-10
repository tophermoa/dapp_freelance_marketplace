import React from 'react';

const Withdraw = (props) =>{
	return(
		<div className="withdraw">
			<h1>Halaman Withdraw</h1>
			<button onClick={props.handleWithdraw}>Withdraw</button>
		</div>
	)
}

export default Withdraw;