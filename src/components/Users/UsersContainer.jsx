import {connect} from "react-redux"
import Users from "./Users"
import {followAC, setUsersAC, unFollowAC, setCurrentPageAC} from "../../redux/users-reducer"

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    followUser: (userID) => {
      dispatch(followAC(userID))
    },
    unFollowUser: (userID) => {
      dispatch(unFollowAC(userID))
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users))
    },
    setCurrentPage: (newCurrentPage) => {
      dispatch(setCurrentPageAC(newCurrentPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)