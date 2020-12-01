import React from 'react'
import Style from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './myPosts/MyPostsContainer'

const Profile = (props) => {
  return (
    <main className={Style.appMainContent}>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        aboutMe={props.aboutMe}
        updateAboutMe={props.updateAboutMe}
        lookFAJobDesc={props.lookFAJobDesc}
        updateLookFAJobDesc={props.updateLookFAJobDesc}
      />
      <MyPostsContainer />
    </main>
  )
}

export default Profile
