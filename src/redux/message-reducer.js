const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
const ON_SUBMIT_NEW_MESSAGE = 'ON-SUBMIT-NEW-MESSAGE'

let initialState = {
  chatNames: [
    {id: 0, name: 'Neo'},
    {id: 1, name: 'Morpheus'},
  ],
  chatData: [
    [
      {
        id: 0,
        message:
          "I know you're out there. I can feel you now. I know that you're afraid... you're afraid of us. You're afraid of change.",
      },
      {
        id: 1,
        message:
          "I don't know the future. I didn't come here to tell you how this is going to end. I came here to tell you how it's going to begin.",
      },
      {
        id: 2,
        message:
          "I'm going to hang up this phone, and then I'm going to show these people what you don't want them to see. I'm going to show them a world without you. A world without rules and controls, without borders or boundaries. A world where anything is possible. Where we go from there is a choice I leave to you.",
      },
    ],
    [
      {id: 0, message: 'Wake up, Neo...'},
      {id: 1, message: 'The Matrix has you...'},
      {id: 2, message: 'Follow the white rabbit...'},
      {id: 3, message: 'Knock, knock, Neo...'},
    ],
  ],
  newMessageText: '',
}

const messageReducer = (state = initialState, action) => {

  switch (action.type) {

    case UPDATE_NEW_MESSAGE_TEXT:
      return  {
        ...state,
        newMessageText: action.text
      }

    case ON_SUBMIT_NEW_MESSAGE:
      if (state.newMessageText === '') return state
      let chatID = action.chatID
      let newMessage = {
        id: state.chatData[chatID].length,
        message: state.newMessageText,
      }
      let stateCopy = {
        ...state,
        chatData: [...state.chatData],
      newMessageText: ''
      }
      stateCopy.chatData[chatID] = [...state.chatData[chatID], newMessage]
      return stateCopy

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