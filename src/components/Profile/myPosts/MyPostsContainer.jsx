import {addPost} from '../../../redux/profile-reducer'
import MyPosts from "./MyPosts"
import {connect} from "react-redux"

const mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData,
    newPostText: state.profilePage.newPostText
  }
}

const MyPostsContainer = connect(
  mapStateToProps, {
    addPost
  }
)(MyPosts)

export default MyPostsContainer