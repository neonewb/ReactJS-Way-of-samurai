import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Style from './App.module.css'

// Import components
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import Profile from './components/Profile/Profile'
import Footer from './components/Footer/Footer'
import Welcome from './components/Welcome/Welcome'
import Dialogs from './components/Dialogs/Dialogs'
import UsersContainer from './components/Users/UsersContainer'
// import Settings from './components/Settings/Settings'
// import News from './components/News/News'
// import Music from './components/Music/Music'

const App = (props) => {
  return (
    <Router>
      <div className={Style.app}>
        <Header />

        <Navigation />

        <Switch>
          <Route
            exact path='/'
            component={Welcome} />

          <Route
            path='/profile'
            render={() => (
              <Profile />
            )}
          />

          <Route
            path='/dialogs'
            render={() => (
              <Dialogs />
            )}
          />

          <Route
            path='/users'
            render={() => (
              <UsersContainer />
            )}
          />
          {/* <Route path='/news'
          component={News} />

          <Route path='/music'
          component={Music} />

          <Route path='/settings'
          component={Settings} /> */}
        </Switch>

        <Footer />
      </div>
    </Router>
  )
}

export default App
