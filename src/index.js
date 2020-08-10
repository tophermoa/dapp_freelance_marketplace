import React          from 'react'
import ReactDOM       from 'react-dom'
import { Provider }   from 'react-redux'
import configureStore from 'core/store/configureStore'
import App            from 'containers/App'
import 'assets/styles/stylesHome.css'
import 'assets/styles/scssHome/stylesHome.scss'
import 'assets/styles/stylesSbAdmin.min.css'
import 'assets/styles/stylesKontrak.css'
// /import 'assets/styles/stylesFontAwesomeSbAdmin.min.css'
//import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
//import 'font-awesome/scss/font-awesome.scss'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
