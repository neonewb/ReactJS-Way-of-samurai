import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './auth-reducer'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

type initialStateType = {
  initialized: boolean
}

let initialState: initialStateType = {
  initialized: false,
}

const appReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }

    default:
      return state
  }
}

// Actions

type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

const initializedSuccess = (): initializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
})

// Thunk

// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, initializedSuccessActionType | >

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess())
  })
}

export default appReducer
