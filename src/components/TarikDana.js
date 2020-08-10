import React from 'react';
import Web3 from 'web3';
import moment from 'moment';
import Kontrakjson from 'abi/Kontrak.json';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';


class TarikDana extends React.Component{
  constructor(props){
    super(props);
    this.silanjut=this.silanjut.bind(this);
  }

  bayarHandler=()=>{

    // const web3 = new Web3(window.web3.currentProvider);

    // const accounts = await web3.eth.getAccounts();

    // const networkId = await web3.eth.net.getId();
    // const networkData = Kontrakjson.networks[networkId];
    // const semua = web3.eth.Contract(Kontrakjson.abi, networkData.address);


    // this.state.semua.methods.pay()
    // .send({
    //  from: this.state.account,
    //  gas: 900000
    // })
    // .then((result)=>{
    //  console.log(result);
    // })


    const contract = require('truffle-contract');
      const abi = contract(Kontrakjson);

      abi.setProvider(web3.currentProvider);

      web3.eth.getAccounts((error, accounts) => {
        abi.deployed().then((instance) => {
          return instance.pay({
            from: accounts[0],
            gas: 900000
          }).then((result) => {
              console.log("result "+result);
          })
        })
      })



  //    const address = "0x5dd2c4E2f87A4A4BfeE571635c8711F7159f1Efc";
  //    const semua = web3.eth.contract(Kontrakjson.abi).at(address);
  
    // //INI PAKE FUNCTION YANG DIBUAT DI SOLIDITYNYA
    
  //    semua.pay.sendTransaction({
  //      from: web3.eth.accounts[0],
  //      gas: 3000000
  //    },
  //    function(err,res){
  //      if(!err){
  //        console.log(res);
  //      } else {
  //        console.log(err);
  //      }
  //      })





  }

  // componentDidMount=()=>{
  //   this.props.cobaRouteJuga();
  // }

  continue = e =>{
    e.preventDefault();
    this.props.nextStep();
  }

  silanjut=(e)=>{
    e.preventDefault();
    this.props.lanjut();
  }


  render(){
    return(
      <div>
        <p>Bagikan alamat <a href="#" onClick={this.silanjut}>URL</a> ke Project Owner</p>
        <button className="btn btn-success" type="button" onClick={this.bayarHandler}>Tarik Dana</button>
      </div>
    )
  }
}

export default TarikDana;