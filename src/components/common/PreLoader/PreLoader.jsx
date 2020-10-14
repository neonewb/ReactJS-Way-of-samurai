import React from 'react'
import Style from './PreLoader.module.css'

const PreLoader = (props) => {
  return (
    <div className={props.header? Style.loaderHeader : Style.loader }>
      <div className={Style.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default PreLoader