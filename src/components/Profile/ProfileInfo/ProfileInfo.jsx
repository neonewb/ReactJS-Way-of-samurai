import React from 'react'
import Style from './ProfileInfo.module.css'
import PreLoader from '../../common/PreLoader/PreLoader'
import userAvatar from '../../../assets/neo1.jpg'
import ProfileStatus from './ProfileStatus'
import ProfileDesc from './ProfileDesc'

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, aboutMe, updateAboutMe, lookFAJobDesc, updateLookFAJobDesc }) => {
  if (!profile) {
    return (
      <div className={Style.mainImg}>
        <PreLoader />
      </div>
    )
  }

  let profilePhoto = profile.photos.large

  if (!profile.photos.large) {
    profilePhoto = userAvatar
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
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
            <ProfileDesc title={aboutMe} updateCallBack={updateAboutMe} profile={profile} />
            <ProfileDesc title={lookFAJobDesc} updateCallBack={updateLookFAJobDesc} profile={profile} />
            {profile.lookingForAJob}
            {profile.contacts.mainLink}
            {isOwner && <input type='file' onChange={onMainPhotoSelected} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
