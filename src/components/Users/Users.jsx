import React from 'react'
import Style from './Users.module.css'
import Pagination from '../common/Paginator/Pagination'
import User from './User'

const Users = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  users,
  isFollowingInProgress,
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
          isFollowingInProgress={isFollowingInProgress}
          followUser={followUser}
          unFollowUser={unFollowUser}
        />
      ))}
    </div>
  )
}

export default Users
