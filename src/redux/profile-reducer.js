import React from "react";
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const profileReducer = (state, action) => {
  switch (action.type) {

    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.text
      return state

    case ADD_POST:
      if (state.newPostText === '') break
      let newPost = {
        id: state.postData.length,
        post: state.newPostText,
      }
      state.postData.push(newPost)
      state.newPostText = ''
      return state

    default:
      return state
  }
}

export const addPostCreator = () => ({
  type: ADD_POST
})

export const updateNewPostTextCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  text
})

export default profileReducer