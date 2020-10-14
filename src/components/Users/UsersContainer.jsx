import React from 'react'
import { connect } from 'react-redux'
import {
  followUserThunk,
  unFollowUserThunk,
  getUsers,
  onPageChanged,
} from '../../redux/users-reducer'
import Users from './Users'
import Loader from '../common/PreLoader/PreLoader'
import { getUsersSel, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getIsFollowingInProgress } from '../../redux/users-selectors'

class UsersContainer extends React.Component {
  componentDidMount() {
    const {currentPage, pageSize, getUsers} = this.props
    getUsers(currentPage, pageSize)
  }

  render() {
    return (
      <>
        {this.props.isFetching && <Loader />}
        <Users
          users={this.props.users}
          pageSize={this.props.pageSize}
          totalUsersCount={this.props.totalUsersCount}
          currentPage={this.props.currentPage}
          onPageChanged={this.props.onPageChanged}
          followUser={this.props.followUserThunk}
          unFollowUser={this.props.unFollowUserThunk}
          isFollowingInProgress={this.props.isFollowingInProgress}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: getUsersSel(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isFollowingInProgress: getIsFollowingInProgress(state),
  }
}

export default connect(mapStateToProps, {
  followUserThunk,
  unFollowUserThunk,
  getUsers,
  onPageChanged,
})(UsersContainer)
