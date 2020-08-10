import React from 'react';
import './styles.scss';
import EthereumIllus from 'assets/image/illus2.png';

class Section2 extends React.Component{
	state={};
	render(){
		return(
			<div>
				<section className="page-section bg-primary text-white about" id="about">
            <div className="container">
                <table>
                <tr>
                <td>
                <div className="disection">
                    <p>
                    Ethereum diluncurkan pada tahun 2015 dengan Blockchain yang dapat diprogram. 
                    Dengan kemampuan ini Blockchain dapat digunakan untuk membuat aplikasi desentralisasi
                     sesuai dengan kebutuhan pengguna. Karakteristik Blockchain Ethereum adalah statefull 
                     dan Turing Completeness. Sehingga dimungkinkan untuk menyimpan data selain transaksi
                     dan membuat program yang kompleks. Blockchain pada Ethereum merupakan public ledger yang 
                     digunakan untuk mencatatkan transaksi yang pernah terjadi. Sehingga, keseluruhan data 
                     transaksi dari awal diluncurkannya Ethereum tercatat di dalam Blockchain.
                    </p>
                </div>
                </td>
                <td><img className="img-section-icon" src={EthereumIllus} /></td>
                </tr>
                </table>
                
            </div>
        </section>
			</div>
		)
	}
}

export default Section2;