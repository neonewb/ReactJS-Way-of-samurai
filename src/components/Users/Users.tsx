import React, { FC } from 'react'
import Style from './Users.module.css'
import Pagination from '../common/Paginator/Pagination'
import User from './User'
import { userType } from '../../types/types'

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (newCurrentPage: number, pageSize: number) => void
  users: Array<userType>
  followingInProgress: Array<number>
  followUser: (userID: number) => void
  unFollowUser: (userID: number) => void
}

const Users: FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  users,
  followingInProgress,
  followUser,
  unFollowUser,
}) => {
  return (
    <div className={Style.users}>
      <Pagination
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />

      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          followingInProgress={followingInProgress}
          followUser={followUser}
          unFollowUser={unFollowUser}
        />
      ))}
    </div>
  )
}

export default Users
