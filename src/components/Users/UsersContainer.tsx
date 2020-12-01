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
import {
  getUsersSel,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getfollowingInProgress,
} from '../../redux/users-selectors'
import { userType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'

type MapStatePropsType = {
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
  users: Array<userType>
}

type MapDispatchPropsType = {
  getUsers: (pageNumber: number, pageSize: number) => void
  onPageChanged: (newCurrentPage: number, pageSize: number) => void
  followUserThunk: (userID: number) => void
  unFollowUserThunk: (userID: number) => void
}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { currentPage, pageSize, getUsers } = this.props
    getUsers(currentPage, pageSize)
  }

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching && <Loader />}
        <Users
          users={this.props.users}
          pageSize={this.props.pageSize}
          totalUsersCount={this.props.totalUsersCount}
          currentPage={this.props.currentPage}
          onPageChanged={this.props.onPageChanged}
          followUser={this.props.followUserThunk}
          unFollowUser={this.props.unFollowUserThunk}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    )
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType  => {
  return {
    users: getUsersSel(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getfollowingInProgress(state),
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
  followUserThunk,
  unFollowUserThunk,
  getUsers,
  onPageChanged,
})(UsersContainer)
