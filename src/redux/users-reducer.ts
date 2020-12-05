import { AppStateType, InferActionsTypes } from './redux-store'
import { userType } from './../types/types'
import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../utils/object-helper'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

let initialState = {
  users: [] as Array<userType>,
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // Array of user ids
}

type initialStateType = typeof initialState

const usersReducer = (
  state = initialState,
  action: UserActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state, action, 'id', { followed: true }),
      }

    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state, action, 'id', { followed: false }),
      }

    case 'SET_USERS': {
      return {
        ...state,
        users: [...action.users],
      }
    }

    case 'SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.newCurrentPage,
      }
    }

    case 'SET_TOTAL_USERS_COUNT': {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }
    }

    case 'TOGGLE_IS_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }

    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFollowProgress
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter((id) => id !== action.userID),
      }
    }

    default:
      return state
  }
}

// Action Creators

type UserActionsTypes = InferActionsTypes<typeof actions>

const actions = {
  followUser: (userID: number) =>
    ({
      type: 'FOLLOW',
      userID,
    } as const),
  unFollowUser: (userID: number) =>
    ({
      type: 'UNFOLLOW',
      userID,
    } as const),
  setUsers: (users: Array<userType>) =>
    ({
      type: 'SET_USERS',
      users,
    } as const),
  setCurrentPage: (newCurrentPage: number) =>
    ({
      type: 'SET_CURRENT_PAGE',
      newCurrentPage,
    } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'SET_TOTAL_USERS_COUNT',
      totalUsersCount,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'TOGGLE_IS_FETCHING',
      isFetching,
    } as const),
  toggleIsFollowingProgress: (isFollowProgress: boolean, userID: number) =>
    ({
      type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
      isFollowProgress,
      userID,
    } as const),
}
// Thunk Creators

// Alternative variat of typing thunk
// type GetStateType = () => AppStateType
// type DispatchType = Dispatch<ActionsTypes>
// dispatch: DispatchType, getState: GetStateType

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  UserActionsTypes
>

type DispatchType = Dispatch<UserActionsTypes>

export const getUsers = (
  pageNumber: number,
  pageSize: number
): ThunkType => async (dispatch, getState) => {
  dispatch(actions.toggleIsFetching(true))
  const data = await usersAPI.getUsers(pageNumber, pageSize)
  dispatch(actions.toggleIsFetching(false))
  dispatch(actions.setUsers(data.items))
  dispatch(actions.setTotalUsersCount(data.totalCount))
}

export const onPageChanged = (
  newCurrentPage: number,
  pageSize: number
): ThunkType => async (dispatch) => {
  dispatch(actions.setCurrentPage(newCurrentPage))
  dispatch(actions.toggleIsFetching(true))

  const data = await usersAPI.getUsers(newCurrentPage, pageSize)
  dispatch(actions.toggleIsFetching(false))
  dispatch(actions.setUsers(data.items))
}

export const unFollowUserThunk = (userID: number): ThunkType => async (
  dispatch
) => {
  let apiMethod = usersAPI.unFollowUser.bind(usersAPI)
  _followOrUnfollow(dispatch, userID, apiMethod, actions.unFollowUser)
}

export const followUserThunk = (userID: number): ThunkType => async (
  dispatch
) => {
  let apiMethod = usersAPI.followUser.bind(usersAPI)
  _followOrUnfollow(dispatch, userID, apiMethod, actions.followUser)
}

const _followOrUnfollow = async (
  dispatch: DispatchType,
  userID: number,
  apiMethod: any,
  actionCreator: (userID: number) => UserActionsTypes
) => {
  dispatch(actions.toggleIsFollowingProgress(true, userID))
  const resultCode = await apiMethod(userID)
  if (resultCode === 0) {
    dispatch(actionCreator(userID))
  }
  dispatch(actions.toggleIsFollowingProgress(false, userID))
}

export default usersReducer
