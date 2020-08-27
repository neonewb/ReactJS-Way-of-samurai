import React from 'react'
import Style from './Users.module.css'
import axios from 'axios'
import {Switch, Route, useRouteMatch} from 'react-router-dom'


class Users extends React.Component {

  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.setUsers(response.data.items)
      })
  }

  getUsers = () => {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.setUsers(response.data.items)
      })
  }

  render() {
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }

    return (
      <div className={Style.users}>
        <div className={Style.pages}>
          {pages.map(page => {
            return (
                <span className={page === this.props.currentPage ? Style.selectedPage : Style.pageNumber} onClick={() => {this.props.setCurrentPage(page)}}>{page}</span>
            )
          })}

        </div>
        {this.props.users.map((user) => (
          <div key={user.id}>
            <div className={Style.user}>
              <div>
                <div className={Style.users__avatar}>
                  <img
                    src={
                      user.photos.small === null
                        ? 'neo1.jpg'
                        : user.photos.small
                    } alt={'avatar'}
                  />
                </div>
                <div>
                  {user.followed ? (
                    <button
                      onClick={() => {
                        this.props.unFollowUser(user.id)
                      }}>
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        this.props.followUser(user.id)
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
                <div>{'country'}</div>
                <div>{'city'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Users