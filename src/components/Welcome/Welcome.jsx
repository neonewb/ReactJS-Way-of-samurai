import React from 'react'
import Style from './Welcome.module.css'

export default function Welcome() {
    return (
        <div className={Style.welcome}>
            <div> Welcome to the Matrix network! </div>
        </div>
    )
}
