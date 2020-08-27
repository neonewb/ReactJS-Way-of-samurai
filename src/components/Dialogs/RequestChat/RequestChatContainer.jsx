import React from 'react'
import { useParams } from 'react-router-dom'
import Message from './Message/Message'
import Style from './RequestChat.module.css'
import {onSubmitMessageCreator, updateNewMessageTextCreator} from "../../../redux/message-reducer";

let RequestChat = (props) => {

  let { chatID } = useParams()
  let message = props.state.chatData[chatID].map((chat) => (
    <Message message={chat.message} id={chat.id} key={chat.id} />
  ))

  const onNewMessageChange = (e) => {
    e.preventDefault()
    let text = e.currentTarget.value
    props.Store.dispatch(updateNewMessageTextCreator(text))
  }

  const onSubmitMessage = (e) => {
    e.preventDefault()
    props.Store.dispatch(onSubmitMessageCreator(chatID))
  }

  return (
    <div>
      <div>{message}</div>
      <form className={Style.nessageInputForm}>
        <input
          placeholder='Write a message...'
          value={props.state.newMessageText}
          onChange={onNewMessageChange}
        />
        <button type='submit' onClick={onSubmitMessage}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default RequestChat
