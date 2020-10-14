import { profileAPI } from '../api/api'

const ADD_POST = 'ADD-POST'
const DELETE_POST = 'DELETE-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'

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
  profile: null,
  status: '',
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      if (action.newPostText === undefined) return state
      let newPost = {
        id: state.postData.length,
        post: action.newPostText,
      }
      return {
        ...state,
        postData: [...state.postData, newPost],
      }

    case DELETE_POST:
      return {
        ...state,
        postData: [...state.postData.filter((p) => p.id !== action.postID)],
      }

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }

    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status,
      }

    default:
      return state
  }
}

// Action
export const addPost = (newPostText) => ({
  type: ADD_POST,
  newPostText,
})

export const deletePost = (postID) => ({
  type: DELETE_POST,
  postID,
})

const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
})

const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
})

// Thunk
export const getProfile = (userID) => async (dispatch) => {
  const response = await profileAPI.getProfile(userID)
  dispatch(setUserProfile(response))
}

export const getUserStatus = (userID) => async (dispatch) => {
  const response = await profileAPI.getUserStatus(userID)
  dispatch(setUserStatus(response))
}

export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
      dispatch(setUserStatus(status))
    }
}

export default profileReducer
