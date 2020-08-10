import React from 'react'
import Web3 from 'web3';
import moment from 'moment';
import Kontrakjson from 'abi/Kontrak.json';
import download from 'assets/image/download.png';
import swal from 'sweetalert';
import ipfs from '../ipfs';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import configureStore from 'core/store/configureStore';
import { withRouter } from 'react-router';
import CariProject from 'pages/CariProject.js'; 


class TerimaHasil extends React.Component{
  constructor(props){
    super(props);
      this.state={
        dataDownload: '',
        account: ''
      }
      this.downloadHandler=this.downloadHandler.bind(this);
      this.completeHandler=this.completeHandler.bind(this);
  }

  componentDidMount=()=>{
    this.setState({
      dataDownload: this.props.ngegetDataDownload
    })
  }


  async componentWillMount(){
    await this.init();


  }


  async init(){
    //const web3 = new Web3(window.web3.currentProvider);
    const web3 = new Web3(window.web3.currentProvider);
    await window.ethereum.enable();

    const accounts = await web3.eth.getAccounts();
      this.setState({account: accounts[0]});

    const networkId = await web3.eth.net.getId();
    const networkData = Kontrakjson.networks[networkId];
    const semua = web3.eth.Contract(Kontrakjson.abi, networkData.address);
    this.setState({semua});
    const hash = await semua.methods.getIpfs().call();
    this.setState({
      ipfsHashnya: hash.toString()
    })

    //IPFS
    // const contract = require('truffle-contract');
  //    const abi = contract(Kontrakjson);

  //    abi.setProvider(web3.currentProvider);

  //    web3.eth.getAccounts((error, accounts) => {
  //      abi.deployed().then((instance) => {
  //        return instance.handShake({
  //          from: accounts[0],
  //          gas: 900000
  //          }).then((result) => {
  //            console.log("result "+result);
  //        })
  //      })
  //    })

  }


  downloadHandler=(e)=>{
    e.preventDefault()
    console.log(this.state.ipfsHashnya)
    console.log(this.state.dataDownload)
    const FileDownload = require('js-file-download')

    // axios.get(`https://ipfs.io/ipfs/QmPsn1TD3e26akJKELYaidpcQChCtZt5XXiRFSDFps5jR8`)
  //      .then((response) => {
  //        FileDownload(response.data, 'file.pdf');
  //      });


    axios({
          url: `https://ipfs.io/ipfs/${this.state.ipfsHashnya}`,
          method: 'GET',
          responseType: 'blob', // important
      }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download','file.rar'); //or any other extension
          document.body.appendChild(link);
          link.click();
      });



    // ipfs.get("QmPsn1TD3e26akJKELYaidpcQChCtZt5XXiRFSDFps5jR8", (err, result)=>{
    //  console.log(result)
    //  // files.map((file)=>{
    //  //  console.log(file.path)
    //  //  console.log(file.content)
    //  // })

      
    // })

    // axios.get('https://ipfs.io/ipfs/QmPsn1TD3e26akJKELYaidpcQChCtZt5XXiRFSDFps5jR8',{
    //    responseType: 'blob'
    //  })
    //  .then((response)=>{
    //    console.log((response))
    //    const url = window.URL.createObjectURL(new Blob([response.data]))
    //    const link = document.createElement('a')
    //    link.href = link
    //    link.setAttribute('download','image.jpg')

    //  })
  }



  continue = e =>{
    e.preventDefault();
    this.props.nextStep();
  }

  back = e =>{
    e.preventDefault();
    this.props.prevStep();
  }

  
  completeHandler=()=>{
    // this.state.semua.methods.complete()
    // .send({
    //   from: this.state.account,
    //   gas: 900000
    // })
    // .then((result)=>{
    //   console.log(result);
    // })

      const contract = require('truffle-contract');
      const abi = contract(Kontrakjson);

      abi.setProvider(web3.currentProvider);

      web3.eth.getAccounts((error, accounts) => {
        abi.deployed().then((instance) => {
          return instance.complete({
            from: accounts[0],
            gas: 900000
          }).then((result) => {
            swal({
              title: "Kontrak Telah Selesai !",
              icon: "success"
            }).then((a)=>{
              return this.props.history.push("/cariproject")
            })
            console.log("result "+result);
          })
        })
      })


  }
  
  
  
  



  render(){
    console.log(this.props.ngegetDataDownload)
    return(
      <div>
      <div>
        <h1 className="mb-5 sih1">Terima Hasil Kerja</h1>
        <div className="align-items-center">        
          <img className="mb-5 sih1" src={download}/>
        </div>
        <div>Unduh Hasil Kerja</div>
        <div>
          <button type="button" className="btn btn-success" onClick={this.downloadHandler}>Download</button>
        </div>
         
            <br />

            <div className="text-right">
              <button type="button" className="btn btn-primary" onClick={this.completeHandler}>
                Kontrak Selesai
              </button>
            </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    ngegetDataDownload: state.ngegetDataDownload
  }
}

export default compose(withRouter, connect(mapStateToProps))(TerimaHasil);