import React from 'react'
import Style from './MyPosts.module.css'
import Post from './Post/Post'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, requiredField } from '../../../utils/validators'
import { Textarea } from '../../common/FormControls/FormControls'

const maxLength10 = maxLengthCreator(10)

let MyPosts = React.memo((props) => {
  let post = [...props.postData].reverse().map((post) => (
    <Post message={post.post} key={post.id} />
  ))

  const onAddPost = (formData) => {
    props.addPost(formData.newPostText)
    formData.newPostText = undefined
  }

  return (
    <div className={Style.appMainPosts}>
      <div></div>
      <AddPostReduxForm onSubmit={onAddPost}/>
      {post}
    </div>
  )
})

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={Style.newPost}>
      <Field
        component={Textarea}
        name='newPostText'
        placeholder='Whats happening?'
        validate={[requiredField, maxLength10]}
      />
      <button type='submit'>
        Add post
      </button>
    </form>
  )
}

const AddPostReduxForm = reduxForm({
  form: 'AddPostForm',
})(AddPostForm)

export default MyPosts
