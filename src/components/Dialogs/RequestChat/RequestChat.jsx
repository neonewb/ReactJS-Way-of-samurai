import React from 'react'
import Message from './Message/Message'
import Style from './RequestChat.module.css'
import {useParams} from "react-router-dom"

let RequestChat = (props) => {
  let { chatID } = useParams()
  let message = props.state.chatData[chatID].map((chat) => (
    <Message message={chat.message} id={chat.id} key={chat.id} />
  ))

  const onNewMessageChange = (e) => {
    e.preventDefault()
    let text = e.currentTarget.value
    props.updateNewMessageText(text)
  }

  const onSendMessage = (e) => {
    e.preventDefault()
    props.sendMessage(chatID)
  }

  return (
    <div>
      <div>{message}</div>
      <form className={Style.messageInputForm}>
        <input
          placeholder='Write a message...'
          value={props.state.newMessageText}
          onChange={onNewMessageChange}
        />
        <button type='submit' onClick={onSendMessage}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default RequestChat
