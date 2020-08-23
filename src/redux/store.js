import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";

let Store = {
  _state: {
    profilePage: {
      postData: [
        {
          id: 0,
          post: 'React Is A JavaScript Library For Building User  Interfaces',
        },
        {
          id: 1,
          post: 'Redux Is A Predictable State Container for JS Apps',
        },
      ],
      newPostText: '',
    },

    messagesPage: {
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
    },
  },

  _callSubscriber() {
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },

  getState() {
    return this._state
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.messagesPage = messageReducer(this._state.messagesPage, action)
    this._callSubscriber(Store)
  },
}

export default Store
