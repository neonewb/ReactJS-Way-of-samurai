const ON_SUBMIT_NEW_MESSAGE = 'ON-SUBMIT-NEW-MESSAGE'

type chatNamesType = {
  id: number
  name: string
}

type chatMessageType = {
  id: number
  message: string
}

let initialState = {
  chatNames: [
    { id: 0, name: 'Neo' },
    { id: 1, name: 'Morpheus' },
  ] as Array<chatNamesType>,
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
    ] as Array<chatMessageType>,
    [
      { id: 0, message: 'Wake up, Neo...' },
      { id: 1, message: 'The Matrix has you...' },
      { id: 2, message: 'Follow the white rabbit...' },
      { id: 3, message: 'Knock, knock, Neo...' },
    ] as Array<chatMessageType>,
  ],
}

type initialStateType = typeof initialState

const messageReducer = (
  state = initialState,
  action: any
): initialStateType => {
  switch (action.type) {
    case ON_SUBMIT_NEW_MESSAGE:
      if (action.text === undefined) return state
      let chatID = action.chatID
      let newMessage = {
        id: state.chatData[chatID].length,
        message: action.text,
      }
      let stateCopy = {
        ...state,
        chatData: [...state.chatData],
      }
      stateCopy.chatData[chatID] = [...state.chatData[chatID], newMessage]
      return stateCopy

    default:
      return state
  }
}

type sendMessageType = {
  type: typeof ON_SUBMIT_NEW_MESSAGE
  text: string
  chatID: number
}

export const sendMessage = (chatID: number, text: string): sendMessageType => ({
  type: ON_SUBMIT_NEW_MESSAGE,
  chatID,
  text,
})

export default messageReducer
