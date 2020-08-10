import React from 'react';
import Web3 from 'web3';
import moment from 'moment';
import Kontrakjson from 'abi/Kontrak.json';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import tick from 'assets/image/tick.png';


class ProjectSelesai extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    return(
      <div>
        <h1 className="mb-5 sih1">Kontrak Perjanjian Telah Selesai</h1>
        <img src={tick} className="mb-5" />
      </div>
    )
  }
}

export default ProjectSelesai;