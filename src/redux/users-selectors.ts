import { AppStateType } from './redux-store'

export const getUsersSel = (state: AppStateType) => {
  return state.usersPage.users
}

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching
}

export const getfollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress
}
