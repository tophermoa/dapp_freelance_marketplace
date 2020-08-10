import React from 'react';
import './styles.scss';
import BlockchainIllus from 'assets/image/illus1.png';

class Section1 extends React.Component{
	state={};
	render(){
		return(
			<div>
				<section className="page-section portfolio" id="portfolio">
            <div className="container">
                <table>
                <tr>
                <td><img className="img-section-icon" src={BlockchainIllus} /></td>
                <td>
                <div className="disection">
                    <p>
                    Blockchain merupakan struktur data 
                    yang memungkinkan membuat buku besar digital
                     (hyperledger) dan membagikannya diantara jaringan dengan
                      pihak independent. Setiap transaksi dalam buku besar
                       publik diverifikasi oleh consensus mayoritas peserta dalam sistem. Setelah dimasukan, 
                       informasi tidak akan pernah bisa diubah atau dihapus.
                    </p>
                </div>
                </td>
                </tr>
                </table>
                
            </div>
        </section>
			</div>
		)
	}
}

export default Section1;