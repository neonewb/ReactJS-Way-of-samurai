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
      />
      <MyPostsContainer />
    </main>
  )
}

export default Profile
