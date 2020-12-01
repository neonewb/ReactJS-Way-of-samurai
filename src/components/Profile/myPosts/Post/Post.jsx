import React from "react";
import Style from "./Post.module.css"
import userAvatar from '../../../../assets/neo1.jpg'

export default function Post(props) {
  return (
    <div className={Style.post}>
      <div className={Style.postAvatar}>
        <img src= {userAvatar} alt='avatar' />
      </div>
      <div className={Style.postText}>
        {props.message}
      </div>
    </div>
  );
}
