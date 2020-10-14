import React from 'react'
import Style from './Navigation.module.css'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className={Style.appNavigation}>

      <NavLink to='/profile' activeClassName={Style.active}>
        Profile
      </NavLink>

      <NavLink to='/dialogs' activeClassName={Style.active}>
        Messages
      </NavLink>

      <NavLink to='/users' activeClassName={Style.active}>
        Users
      </NavLink>

      <NavLink to='/settings' activeClassName={Style.active}>
        Settings
      </NavLink>
    </nav>
  )
}
