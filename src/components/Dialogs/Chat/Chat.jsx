import React from 'react'
import Style from './Chat.module.css'
import { NavLink, useRouteMatch } from 'react-router-dom'

export default function Chat(props) {
    let match = useRouteMatch();
    return  (
        <NavLink to={`${match.url}/${props.id}`} activeClassName={Style.active}> 
            {props.name}
        </NavLink> 
    )
}