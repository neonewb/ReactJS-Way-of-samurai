import { userType } from './../types/types';
import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../utils/object-helper'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
  users: [] as Array<userType>,
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowingInProgress: [] as Array<number>, // Array of user ids
}

type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state, action, 'id', {followed: true})
      }

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state, action, 'id', {followed: false})
      }

    case SET_USERS: {
      return {
        ...state,
        users: [...action.users],
      }
    }

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.newCurrentPage,
      }
    }

    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }
    }

    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }

    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        isFollowingInProgress: action.isFollowProgress
          ? [...state.isFollowingInProgress, action.userID]
          : state.isFollowingInProgress.filter((id) => id !== action.userID),
      }
    }

    default:
      return state
  }
}

// Action Creators
type followUserType = {
  type: typeof FOLLOW
  userID: number
}
const followUser = (userID: number): followUserType => ({
  type: FOLLOW,
  userID,
})

type unFollowUserType = {
  type: typeof UNFOLLOW
  userID: number
}
const unFollowUser = (userID: number): unFollowUserType => ({
  type: UNFOLLOW,
  userID,
})

type setUsersType = {
  type: typeof SET_USERS
  users: Array<userType>
}
const setUsers = (users: Array<userType>): setUsersType => ({
  type: SET_USERS,
  users,
})

type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  newCurrentPage: number
}
const setCurrentPage = (newCurrentPage: number): setCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  newCurrentPage,
})

type setTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsersCount: number
}
const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
})

type toggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})

type toggleIsFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFollowProgress: boolean
  userID: number
}
const toggleIsFollowingProgress = (isFollowProgress: boolean, userID: number): toggleIsFollowingProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFollowProgress,
  userID,
})

// Thunk Creators

export const getUsers = (pageNumber: number, pageSize: number) => async (dispatch: any) => {
  dispatch(toggleIsFetching(true))
  const data = await usersAPI.getUsers(pageNumber, pageSize)
  dispatch(toggleIsFetching(false))
  dispatch(setUsers(data.items))
  dispatch(setTotalUsersCount(data.totalCount))
}

export const onPageChanged = (newCurrentPage: number, pageSize: number) => async (dispatch: any) => {
  dispatch(setCurrentPage(newCurrentPage))
  dispatch(toggleIsFetching(true))

  const data = await usersAPI.getUsers(newCurrentPage, pageSize)
  dispatch(toggleIsFetching(false))
  dispatch(setUsers(data.items))
}

export const unFollowUserThunk = (userID: number) => async (dispatch: any) => {
  let apiMethod = usersAPI.unFollowUser.bind(usersAPI)
  followOrUnfollow(dispatch, userID, apiMethod, unFollowUser)
}

export const followUserThunk = (userID: number) => async (dispatch: any) => {
  let apiMethod = usersAPI.followUser.bind(usersAPI)
  followOrUnfollow(dispatch, userID, apiMethod, followUser)
}

const followOrUnfollow = async (dispatch: any, userID: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleIsFollowingProgress(true, userID))
  const resultCode = await apiMethod(userID)
  if (resultCode === 0) {
    dispatch(actionCreator(userID))
  }
  dispatch(toggleIsFollowingProgress(false, userID))
}

export default usersReducer