const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
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
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_NEW_POST_TEXT:
      return  {
        ...state,
        newPostText: action.text
      }

    case ADD_POST:
      if (state.newPostText === '') return state
      let newPost = {
        id: state.postData.length,
        post: state.newPostText,
      }
      return {
        ...state,
        postData: [...state.postData, newPost],
        newPostText: ''
      }

    default:
      return state
  }
}

export const addPostCreator = () => ({
  type: ADD_POST
})

export const updateNewPostTextCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  text
})

export default profileReducer