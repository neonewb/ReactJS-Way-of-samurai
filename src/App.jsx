import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Style from './App.module.css'

// Import components
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import Profile from './components/Profile/Profile'
import Footer from './components/Footer/Footer'
import Dialogs from './components/Dialogs/Dialogs'
import Welcome from './components/Welcome/Welcome'
// import Settings from './components/Settings/Settings'
// import News from './components/News/News'
// import Music from './components/Music/Music'

let App = (props) => {
  return (
    <Router>
      <div className={Style.app}>
        <Header />

        <Navigation />

        <Switch>
          <Route exact path='/' component={Welcome} />

          <Route
            path='/profile'
            render={() => (
              <Profile
                profileState={props.state.profilePage}
                newPostText={props.state.profilePage.newPostText}
                dispatch={props.Store.dispatch.bind(props.Store)}
              />
            )}
          />

          <Route
            path='/dialogs'
            render={() => (
              <Dialogs
                Store={props.Store}
              />
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
