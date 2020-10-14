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
  users: [],
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
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

const followUser = (userID) => ({
  type: FOLLOW,
  userID,
})

const unFollowUser = (userID) => ({
  type: UNFOLLOW,
  userID,
})

const setUsers = (users) => ({
  type: SET_USERS,
  users,
})

const setCurrentPage = (newCurrentPage) => ({
  type: SET_CURRENT_PAGE,
  newCurrentPage,
})

const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
})

const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})

const toggleIsFollowingProgress = (isFollowProgress, userID) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFollowProgress,
  userID,
})

// Thunk Creators

export const getUsers = (pageNumber, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true))
  const data = await usersAPI.getUsers(pageNumber, pageSize)
  dispatch(toggleIsFetching(false))
  dispatch(setUsers(data.items))
  dispatch(setTotalUsersCount(data.totalCount))
}

export const onPageChanged = (newCurrentPage, pageSize) => async (dispatch) => {
  dispatch(setCurrentPage(newCurrentPage))
  dispatch(toggleIsFetching(true))

  const data = await usersAPI.getUsers(newCurrentPage, pageSize)
  dispatch(toggleIsFetching(false))
  dispatch(setUsers(data.items))
}

export const unFollowUserThunk = (userID) => async (dispatch) => {
  let apiMethod = usersAPI.unFollowUser.bind(usersAPI)
  followOrUnfollow(dispatch, userID, apiMethod, unFollowUser)
}

export const followUserThunk = (userID) => async (dispatch) => {
  let apiMethod = usersAPI.followUser.bind(usersAPI)
  followOrUnfollow(dispatch, userID, apiMethod, followUser)
}

const followOrUnfollow = async (dispatch, userID, apiMethod, actionCreator) => {
  dispatch(toggleIsFollowingProgress(true, userID))
  const resultCode = await apiMethod(userID)
  if (resultCode === 0) {
    dispatch(actionCreator(userID))
  }
  dispatch(toggleIsFollowingProgress(false, userID))
}

export default usersReducer
