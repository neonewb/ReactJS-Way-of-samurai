const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
const ON_SUBMIT_NEW_MESSAGE = 'ON-SUBMIT-NEW-MESSAGE'

const messageReducer = (state, action) => {
  switch (action.type) {

    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageText = action.text
      return state

    case ON_SUBMIT_NEW_MESSAGE:
      if (state.newMessageText === '') break
      let chatID = action.chatID
      let newMessage = {
        id: state.chatData[chatID].length,
        message: state.newMessageText,
      }
      state.chatData[chatID].push(newMessage)
      state.newMessageText = ''
      return state

    default:
      return state
  }
}

export const updateNewMessageTextCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  text
})

export const onSubmitMessageCreator = (chatID) => ({
  type: ON_SUBMIT_NEW_MESSAGE,
  chatID
})

export default messageReducer