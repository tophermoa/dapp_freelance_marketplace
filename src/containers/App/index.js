import React, { Component }   from 'react'
import Pembayaran from 'pages/Pembayaran'
import ReviewContract from 'pages/ReviewContract'
import Home from 'containers/Home'
//import Wrapper from 'containers/Wrapper'
//import WrapperFix from 'containers/WrapperFix';
import CariProject from 'pages/CariProject'; 
import BuatProject from 'pages/BuatProject'; 
import Tawaran from 'pages/Tawaran';
import WBuatProject from 'containers/Wrapper/WBuatProject.js';
import WCariProject from 'containers/Wrapper/WCariProject.js';
import WTawaran from 'containers/Wrapper/WTawaran.js';
import KontrakGabungan from 'pages/KontrakGabungan.js';
import Kontrak from 'components/Kontrak.js';
import TerimaHasil from 'pages/TerimaHasil.js';
import KonfirmasiKontrak from 'pages/KonfirmasiKontrak.js';
import WKontrakProject from 'containers/Wrapper/WKontrakProject.js';
import DataC from 'pages/DataC';
import DataC1 from 'pages/DataC1';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Profile from 'pages/Profile';
import UserFunctions from 'functions/UserFunctions.js'
import { MuiThemeProvider }   from '@material-ui/core/styles'
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import theme                    from 'configs/theme/config-theme'
import HomeView                 from 'containers/HomeView'
import Header                   from './components/Header'
import Footer                   from './components/Footer'
import CTes from 'pages/CTes';
import CTess from 'pages/CTess';


import './styles.scss' // global styles

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <div>
            {/*<Footer />*/}
            <div className="app-shell">
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/pembayaran" component={Pembayaran} />
                <Route path="/reviewcontract" component={ReviewContract} />
                <Route path="/buatproject" component={WBuatProject} />

                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />

                <Route path="/ctes" component={CTes} />
                <Route path="/ctess" component={CTess} />
                <Route path="/datac1" component={DataC1} />
                <Route path="/userfunctions" component={UserFunctions} />

                <Route path="/kontrakproject" name="kontrakproject" component={WKontrakProject} />
                <Route path="/cariproject" name="cariproject" component={WCariProject} />
                <Route path="/tawaran/:dataId" name="tawaran" component={WTawaran} data="satu" />
                <Route path="/kontrak" name="Kontrak" component={Kontrak} />
                <Route path="/konfirmasikontrak" name="KonfirmasiKontrak" component={KonfirmasiKontrak} />
                <Route path="/kontrakgabungan" name="KontrakGabungan" component={KontrakGabungan} />
                <Route path="/terimahasil" name="TerimaHasil" component={TerimaHasil} />
                

                <Redirect from="/" to="/home" />
              </Switch>
            </div>
          </div>
        </HashRouter>
      </MuiThemeProvider>
      
    )
  }
}

export default App
