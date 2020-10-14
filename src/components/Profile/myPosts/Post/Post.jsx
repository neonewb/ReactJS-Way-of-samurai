import React from "react";
import Style from "./Post.module.css"

export default function Post(props) {
  return (
    <div className={Style.post}>
      <div className={Style.postAvatar}>
        <img src='neo1.jpg' alt='avatar' />
      </div>
      <div className={Style.postText}>
        {props.message}
      </div>
    </div>
  );
}
