const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

let initialState = {
  users: [],
  pageSize: 4,
  totalUsersCount: 19,
  currentPage: 1
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userID) {
            return {...user, followed: true}
          }
          return user
        })
      }

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userID) {
            return {...user, followed: false}
          }
          return user
        })
      }

    case  SET_USERS: {
      return {
        ...state,
        users: [...state.users, ...action.users]
      }
    }
    
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.newCurrentPage
      }
    }
    default:
      return state
  }
}

export const followAC = (userID) => ({
  type: FOLLOW,
  userID
})

export const unFollowAC = (userID) => ({
  type: UNFOLLOW,
  userID
})

export const setUsersAC = (users) => ({
  type: SET_USERS,
  users
})

export const setCurrentPageAC = (newCurrentPage) => ({
  type: SET_CURRENT_PAGE,
  newCurrentPage
})

export default usersReducer