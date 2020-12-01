import React, { useEffect, useState } from 'react'
import Style from './ProfileInfo.module.css'

const ProfileDesc = ({title, updateCallBack, profile}) => {
  const [editMode, setEditMode] = useState(false)
  const [titleLS, setTitle] = useState(title)

  useEffect( () => {
    setTitle(title)
  }, [title])

  const handleFocus = (e) => e.target.select()

  const onBlur = () => {
    setEditMode(false)
    updateCallBack(titleLS, profile)
  }

  const onChange = (e) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode && (
        <div>
          <span
            className={Style.profile__aboutMe}
            onClick={() => setEditMode(true)}>
            {title || 'no title'}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <textarea
            autoFocus={true}
            onFocus={handleFocus}
            onBlur={onBlur}
            value={titleLS}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  )
}

export default ProfileDesc
