import React from 'react'
import Style from './Header.module.css'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
  return (
    <header className={Style.appHeader}>
      <div className={Style.loginBlock}>

          {props.isAuth ? (
            <div>
              {props.login} <button onClick={props.logOut}>Logout</button>
            </div>
          ) : (
            <NavLink to={'/login'}>
              Login
            </NavLink>
          )}
      </div>
    </header>
  )
}

export default Header
