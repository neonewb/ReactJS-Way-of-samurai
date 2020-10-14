import { stopSubmit } from 'redux-form'
import { authAPI } from '../api/api'

const SET_USER_DATA = 'auth/SET_USER_DATA'

let initialState = {
  userID: null,
  login: null,
  email: null,
  isAuth: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payLoad,
      }

    default:
      return state
  }
}

const setAuthUserData = (userID, login, email, isAuth) => ({
  type: SET_USER_DATA,
  payLoad: {
    userID,
    login,
    email,
    isAuth,
  },
})

// Thunk

export const getAuthUserData = () => async (dispatch) => {
  const response = await authAPI.authMe()
  if (response.resultCode === 0) {
    let { id: userID, login, email } = response.data
    dispatch(setAuthUserData(userID, login, email, true))
  }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe)
  if (response.resultCode === 0) {
    dispatch(getAuthUserData())
  } else {
    let message =
      response.messages.length > 0 ? response.messages[0] : 'Some error'
    dispatch(stopSubmit('login', { _error: message }))
  }
}

export const logOut = () => async (dispatch) => {
  const response = await authAPI.logOut()
  if (response.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export default authReducer
