import React from 'react'
import Style from './ProfileInfo.module.css'
import PreLoader from '../../common/PreLoader/PreLoader'
import ProfileStatus from './ProfileStatus'

const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return (
      <div className={Style.mainImg}>
        <PreLoader />
      </div>
    )
  }

  let profilePhoto = profile.photos.large

  if (profile.photos.large === null) {
    profilePhoto = 'neo1.jpg'
  }

  return (
    <div>
      <div className={Style.profile}>
        <img
          className={Style.profile__avatar}
          src={profilePhoto}
          alt={'profileImg'}
        />
        <div className={Style.profile__NameAbout}>
          <div className={Style.profile__Name}>{profile.fullName}</div>
          <div>
            <ProfileStatus status={status} updateStatus={updateStatus} />
            {profile.aboutMe}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
