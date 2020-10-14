import React from 'react'
import Message from './Message/Message'
import Style from './RequestChat.module.css'
import {useParams} from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../../common/FormControls/FormControls'
import { requiredField, maxLengthCreator } from '../../../utils/validators'

const maxLength100 = maxLengthCreator(100)

let RequestChat = (props) => {
  let { chatID } = useParams()
  let message = props.state.chatData[chatID].map((chat) => (
    <Message message={chat.message} id={chat.id} key={chat.id} />
  ))

  const onSendMessage = (formData) => {
    props.sendMessage(chatID, formData.newMessageText)
    formData.newMessageText = undefined
  }

  return (
    <div>
      <div>{message}</div>
      <AddMessageFormRedux onSubmit={onSendMessage}/>
    </div>
  )
}

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={Style.messageInputForm}>
        <Field
          component={Input}
          name='newMessageText'
          placeholder='Write a message...'
          validate={[requiredField, maxLength100]}
        />
        <button type='submit'>
          Submit
        </button>
      </form>
  )
}

const AddMessageFormRedux = reduxForm({
  form: 'AddMessageForm',
})(AddMessageForm)


export default RequestChat
