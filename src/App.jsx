import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import Style from './App.module.css'

// Import components
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import Settings from './components/Settings/Settings'
import HeaderContainer from './components/Header/HeaderContainer'
import LoginPage from './components/Login/Login'

import { initializeApp } from '../src/redux/app-reducer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PreLoader from './components/common/PreLoader/PreLoader'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './redux/redux-store'
import { withSuspense } from './hoc/withSuspense'
const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'))

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <PreLoader />
    }

    return (
      <div className={Style.app}>
        <HeaderContainer />

        <Navigation />

        <Route exact path='/' component={LoginPage} />

        <Route path='/profile/:userID?' render={() => <ProfileContainer />} />

        <Route path='/dialogs' render={withSuspense(Dialogs)} />

        <Route path='/users' render={() => <UsersContainer />} />

        <Route path='/settings' render={() => <Settings />} />

        <Route path='/login' render={() => <LoginPage />} />

        <Route path='*' render={() => <div>404 not found</div>} />

        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

const SamuraiJSApp = (props) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <AppContainer />
        </Router>
      </Provider>
    </React.StrictMode>
  )
}

export default SamuraiJSApp
