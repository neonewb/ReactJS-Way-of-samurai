import React, { useEffect, useState } from 'react'
import Style from './ProfileInfo.module.css'

const ProfileStatus = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  useEffect( () => {
    setStatus(props.status)
  }, [props.status])

  const handleFocus = (e) => e.target.select()

  const onBlur = () => {
    setEditMode(false)
    props.updateStatus(status)
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
            {props.status || 'no status'}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            autoFocus={true}
            onFocus={handleFocus}
            onBlur={onBlur}
            value={status}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  )
}

export default ProfileStatus
