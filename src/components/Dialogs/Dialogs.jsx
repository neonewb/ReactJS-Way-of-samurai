import React from 'react'
import Style from './Dialogs.module.css'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Chat from './Chat/Chat'
import RequestChat from './RequestChat/RequestChat'

let Dialogs = (props) => {
  let state = props.Store.getState().messagesPage

  const match = useRouteMatch()
  let chat = state.chatNames.map((chat) => (
    <Chat name={chat.name} id={chat.id} key={chat.id} />
  ))
  return (
    <div className={Style.dialogsPage}>
      <div className={Style.dialogs}>
        <b>Chats</b>
        {chat}
      </div>

      <div className={Style.messages}>
        <b>Messages</b>
        <Switch>
          <Route path={`${match.path}/:chatID`}>
            <RequestChat
              // chatData={state.messagesState.chatData}
              // newMessageText={state.messagesState.newMessageText}
              // dispatch = {props.dispatch}
              Store={props.Store}
            />
          </Route>
          <Route path={match.path}>
            <div>
              <i> Select chat </i>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Dialogs
