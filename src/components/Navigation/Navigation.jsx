import React from 'react'
import Style from './Navigation.module.css'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className={Style.appNavigation}>
      {/* <NavLink exact to='/' activeClassName={Style.active}>Home</NavLink> */}
      <NavLink to='/profile' activeClassName={Style.active}>
        Profile
      </NavLink>
      <NavLink to='/dialogs' activeClassName={Style.active}>
        Messages
      </NavLink>
      <NavLink to='/users' activeClassName={Style.active}>
        Users
      </NavLink>
      {/* <NavLink to='/news' activeClassName={Style.active}>News</NavLink>
        <NavLink to='/music' activeClassName={Style.active}>Music</NavLink>
        <NavLink to='/settings' activeClassName={Style.active}>Settings</NavLink> */}
    </nav>
  )
}
