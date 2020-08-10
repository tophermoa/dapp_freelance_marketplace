import React from 'react';

const Deposit =(props)=>{
	return(
		<div className="deposit">
		<h1>Halaman Deposit</h1>
			<form onSubmit={props.handleDeposit}>
				<label>Masukan Jumlah ETH</label>
				<input id="jumlah" onChange={props.ethChange} />
				<button type="submit">deposit</button>
			</form>
	</div>
	)	
}

export default Deposit;