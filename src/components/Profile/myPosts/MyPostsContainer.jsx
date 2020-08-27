import React from 'react'
import {addPostCreator, updateNewPostTextCreator} from '../../../redux/profile-reducer'
import MyPosts from "./MyPosts"
import {connect} from "react-redux"

const mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData,
    newPostText: state.profilePage.newPostText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPost: (text) => {
      dispatch(updateNewPostTextCreator(text))
    },
    addPost: () => {
      dispatch(addPostCreator())
    }
  }
}

const MyPostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts)

export default MyPostsContainer

// const MyPostsContainer = (props) => {
//   return (
//     <StoreContext.Consumer>
//       { (Store) => {
//         let state = Store.getState().profilePage
//         const onAddPost = () => {
//           let action = addPostCreator()
//           Store.dispatch(action)
//         }
//
//         const onPostChange = (text) => {
//           let action = updateNewPostTextCreator(text)
//           Store.dispatch(action)
//         }
//
//         return (
//           <MyPosts updateNewPost={onPostChange}
//                    addPost={onAddPost}
//                    postData={state.postData}
//                    newPostText={state.newPostText}/>)
//       }
//     }
//     </StoreContext.Consumer>
//   )
// }
