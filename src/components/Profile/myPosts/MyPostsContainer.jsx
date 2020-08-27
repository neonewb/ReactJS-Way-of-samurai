import React from 'react'
import Style from './MyPosts.module.css'
import Post from './Post/Post'
import {addPostCreator, updateNewPostTextCreator} from '../../../redux/profile-reducer';

let MyPosts = (props) => {
  let post = props.postData.map((post) => (
    <Post message={post.post} key={post.id} />
  ))

  const onAddPost = (e) => {
    e.preventDefault()
    // props.addPost()
    props.dispatch(addPostCreator())
  }

  const onPostChange = (e) => {
    e.preventDefault()
    let text = e.currentTarget.value
    // props.updateNewPost(text)
    props.dispatch(updateNewPostTextCreator(text))
  }

  return (
    <div className={Style.appMainPosts}>
      <div>My posts</div>
      <form className={Style.newPost}>
        <textarea
          onChange={onPostChange}
          placeholder='Whats happening?'
          value={props.newPostText}
        />
        <button type='submit' onClick={onAddPost}>
          Add post
        </button>
      </form>
      {post}
    </div>
  )
}

export default MyPosts
