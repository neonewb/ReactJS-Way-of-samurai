import React from 'react'
import Style from './Dialogs.module.css'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import Chat from './Chat/Chat'
import RequestChatContainer from "./RequestChat/RequestChatContainer"
import {connect} from "react-redux";
import Store from "../../redux/redux-store"

let Dialogs = (props) => {

  // let mapStateToProps = (state) => {
  //   return {
  //     name: state.messagesPage.chatNames[1].name,
  //     id: state.messagesPage.chatNames[1].id,
  //     key: state.messagesPage.chatNames[1].id
  //   }
  // }
  // let chat = connect(
  //   mapStateToProps)(Chat)

  let state = Store.getState().messagesPage

  let chat = state.chatNames.map((chat) => (
    <Chat name={chat.name} id={chat.id} key={chat.id}/>
  ))

  const match = useRouteMatch()
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
            <RequestChatContainer/>
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
