import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import {
  getProfile,
  getUserStatus,
  updateStatus,
  savePhoto,
  updateAboutMe,
  updateLookFAJobDesc,
} from '../../redux/profile-reducer'
import { withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userID = this.props.match.params.userID
    if (!userID) {
      userID = this.props.userID
      if (!userID) {
        this.props.history.push('/login')
      }
    }
    this.props.getProfile(userID)
    this.props.getUserStatus(userID)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userID !== prevProps.match.params.userID) {
      this.refreshProfile()
    }
  }

  render() {
    return (
      <>
        <Profile {...this.props} isOwner={!this.props.match.params.userID} />
      </>
    )
  }
}

const mapSateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  aboutMe: state.profilePage.profile.aboutMe,
  lookFAJobDesc: state.profilePage.profile.lookingForAJobDescription,
  userID: state.auth.userID,
  isAuth: state.auth.isAuth,
})

export default compose(
  withAuthRedirect,
  withRouter,
  connect(mapSateToProps, {
    getProfile,
    getUserStatus,
    updateStatus,
    savePhoto,
    updateAboutMe,
    updateLookFAJobDesc,
  })
)(ProfileContainer)
