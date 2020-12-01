import React, { useEffect, useState } from 'react'
import Style from './ProfileInfo.module.css'

const ProfileStatus = ({status, updateStatus}) => {
  const [editMode, setEditMode] = useState(false)
  const [statusLS, setStatus] = useState(status)

  useEffect( () => {
    setStatus(status)
  }, [status])

  const handleFocus = (e) => e.target.select()

  const onBlur = () => {
    setEditMode(false)
    updateStatus(statusLS)
  }

  const onChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode && (
        <div>
          <span
            className={Style.profile__status}
            onClick={() => setEditMode(true)}>
            {status || 'no status'}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            autoFocus={true}
            onFocus={handleFocus}
            onBlur={onBlur}
            value={statusLS}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  )
}

export default ProfileStatus