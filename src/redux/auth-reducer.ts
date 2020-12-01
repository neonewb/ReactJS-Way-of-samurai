import { stopSubmit } from 'redux-form'
import { authAPI, securityAPI } from '../api/api'

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL'

type initialStateType2 = {
  userID: number | null
  login: string | null
  email: string | null
  isAuth: boolean
  captchaURL?: string | null
}

let initialState = {
  userID: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  captchaURL: null as string | null,
}

type initialStateType = typeof initialState

const authReducer = (state = initialState, action: any): initialStateType2 => {

  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

type setAuthUserDataActionPayloadType = {
  userID: number | null
  login: string | null
  email: string | null
  isAuth: boolean
}

type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: setAuthUserDataActionPayloadType
}

const setAuthUserData = (
  userID: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean
): setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: {
    userID,
    login,
    email,
    isAuth,
  },
})

type setCaptchaURLType = {
  type: typeof SET_CAPTCHA_URL
  payload: { captchaURL: string }
}

const setCaptchaURL = (captchaURL: string): setCaptchaURLType => ({
  type: SET_CAPTCHA_URL,
  payload: {
    captchaURL,
  },
})

// Thunk

export const getAuthUserData = () => async (dispatch: any) => {
  const response = await authAPI.authMe()
  if (response.resultCode === 0) {
    let { id: userID, login, email } = response.data
    dispatch(setAuthUserData(userID, login, email, true))
  }
}

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
) => async (dispatch: any) => {
  const response = await authAPI.login(email, password, rememberMe, captcha)
  if (response.resultCode === 0) {
    dispatch(getAuthUserData())
  } else {
    if (response.resultCode === 10) {
      dispatch(getCaptchaURL())
    }
    let message =
      response.messages.length > 0 ? response.messages[0] : 'Some error'
    dispatch(stopSubmit('login', { _error: message }))
  }
}

export const logOut = () => async (dispatch: any) => {
  const response = await authAPI.logOut()
  if (response.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export const getCaptchaURL = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptcha()
  const captchaURL = response.url
  dispatch(setCaptchaURL(captchaURL))
}

export default authReducer
