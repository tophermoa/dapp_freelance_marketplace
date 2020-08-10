import React from 'react';
import Web3 from 'web3';
import Pembayaranjson from 'abi/Pembayaran.json';
import Withdraw from '../components/Withdraw'

class ReviewContract extends React.Component{

	withdrawHandler = () =>{
		const contract = require('truffle-contract');
		const abi = contract(Pembayaranjson);

		abi.setProvider(web3.currentProvider);

		web3.eth.getAccounts((error, accounts) => {
			abi.deployed().then((instance)=>{
				return instance.withdraw({
					from: accounts[0],
					gas: 43000
				}).then((result)=>{
					console.log("result " +result);
				})
			})
		})
	}

	render(){
		return(
			<div>
				<Withdraw handleWithdraw={this.withdrawHandler} />
			</div>
		)
	}
}

export default ReviewContract;