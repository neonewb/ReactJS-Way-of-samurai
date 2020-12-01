import React from 'react'
import Style from './Users.module.css'
import { NavLink } from 'react-router-dom'
import userAvatar from '../../assets/neo1.jpg'

const User = ({
  user,
  isFollowingInProgress,
  followUser,
  unFollowUser,
}) => {
  return (
    <div className={Style.user}>
      <div>
        <div className={Style.users__avatar}>
          <NavLink to={'/profile/' + user.id}>
            <img
              src={user.photos.small === null ? userAvatar : user.photos.small}
              alt={'avatar'}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={isFollowingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unFollowUser(user.id)
              }}>
              Unfollow
            </button>
          ) : (
            <button
              disabled={isFollowingInProgress.some((id) => id === user.id)}
              onClick={() => {
                followUser(user.id)
              }}>
              Follow
            </button>
          )}
        </div>
      </div>
      <div>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default User
