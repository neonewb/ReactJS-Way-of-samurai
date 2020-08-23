import React from 'react'
import Style from './Footer.module.css'

export default function Footer() {
    return (
      <footer className={Style.appFooter}>
      {`Made by `}
      <a
        className={Style.telegram}
        href='https://t.me/NeoRuslan'
        target='_blank'
        rel='noopener noreferrer'
      >
        Neo 
      </a>
      {` with `}
      <a
        className={Style.react}
        href='https://reactjs.org'
        target='_blank'
        rel='noopener noreferrer'
      >
        React
      </a>
      {` & `}
      <a
        className={Style.redux}
        href='https://redux.js.org/'
        target='_blank'
        rel='noopener noreferrer'
      >
      Redax
      </a>
      </footer>
    )
}
