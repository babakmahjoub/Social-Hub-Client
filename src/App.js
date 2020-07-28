import React from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'
import themeFile from './util/theme'
import './App.css';

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'


//Components
import Navbar from './components/Navbar'
import AuthRoute from './util/AuthRoute'

//Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const theme = createMuiTheme(themeFile)



const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    store.dispatch(logoutUser())
  } else {
    store.dispatch({ type: SET_AUTHENICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={home} />
              <AuthRoute exact path='/login' component={login} />
              <AuthRoute exact path='/signup' component={signup} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
