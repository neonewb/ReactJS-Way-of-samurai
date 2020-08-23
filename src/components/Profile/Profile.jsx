import React from "react"
import Style from "./Profile.module.css"
import MyPosts from "./myPosts/MyPosts"
import ProfileInfo from "./ProfileInfo/ProfileInfo";

 let Profile = (props) => {
  return (
    <main className={Style.appMainContent}>
      <ProfileInfo />
      <MyPosts 
        postData={props.profileState.postData} 
        newPostText = {props.newPostText}
        dispatch = {props.dispatch}
      />
    </main>
  );
}

export default Profile