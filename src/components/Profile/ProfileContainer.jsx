import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {getProfile, getUserStatus, updateStatus} from '../../redux/profile-reducer'
import {withRouter} from 'react-router-dom'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userID = this.props.match.params.userID
    if (!userID) {
      userID = this.props.userID
      if(!userID) {
        this.props.history.push('/login')
      }
    }
    this.props.getProfile(userID)
    this.props.getUserStatus(userID)
  }

  render() {
    return (
      <>
        <Profile
          {...this.props}
        />
      </>
    )
  }
}

const mapSateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userID: state.auth.userID,
  isAuth: state.auth.isAuth
})

export default compose(
  withAuthRedirect,
  withRouter,
  connect(mapSateToProps, {getProfile, getUserStatus, updateStatus})
)(ProfileContainer)