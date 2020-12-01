import { photosType, profileType } from './../types/types'
import { profileAPI } from '../api/api'
import { postType } from '../types/types'

const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'
const SET_USER_PHOTO = 'SET_USER_PHOTO'
const SET_USER_ABOUT_ME = 'SET_USER_ABOUT_ME'
const SET_LOOK_FOR_A_JOB_DESC = 'SET_LOOK_FOR_A_JOB_DESC'

let initialState = {
  postData: [
    {
      id: 0,
      post: 'React Is A JavaScript Library For Building User  Interfaces',
    },
    {
      id: 1,
      post: 'Redux Is A Predictable State Container for JS Apps',
    },
  ] as Array<postType>,
  profile: {
    fullName: 'NeoRuslan',
    aboutMe: '',
    photos: '',
    lookingForAJob: true,
    lookingForAJobDescription: '',
    contacts: {
      mainLink: '',
    },
  } as profileType | null,
  status: '',
}

type initialStateType = typeof initialState

const profileReducer = (
  state = initialState,
  action: any
): initialStateType => {
  switch (action.type) {
    case ADD_POST:
      if (action.newPostText === undefined) return state
      let newPost = {
        id: state.postData.length,
        post: action.newPostText,
      }
      return {
        ...state,
        postData: [...state.postData, newPost],
      }

    case DELETE_POST:
      return {
        ...state,
        postData: [...state.postData.filter((p) => p.id !== action.postID)],
      }

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }

    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status,
      }

    case SET_USER_PHOTO:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as profileType,
      }

    case SET_USER_ABOUT_ME:
      return {
        ...state,
        profile: {
          ...state.profile,
          aboutMe: action.aboutMeText,
        } as profileType,
      }
    case SET_LOOK_FOR_A_JOB_DESC:
      return {
        ...state,
        profile: {
          ...state.profile,
          lookingForAJobDescription: action.lookFAJobDesc,
        } as profileType,
      }

    default:
      return state
  }
}

// Types
type addPostType = {
  type: typeof ADD_POST
  newPostText: string
}

type deletePostType = {
  type: typeof DELETE_POST
  postID: number
}

type setUserProfileType = {
  type: typeof SET_USER_PROFILE
  profile: profileType
}

type setUserStatusType = {
  type: typeof SET_USER_STATUS
  status: string
}

type savePhotoSuccessType = {
  type: typeof SET_USER_PHOTO
  photos: photosType
}

type updateAboutMeSuccessType = {
  type: typeof SET_USER_ABOUT_ME
  aboutMeText: string
}

type updatelookFAJobDescSuccessType = {
  type: typeof SET_LOOK_FOR_A_JOB_DESC
  lookFAJobDesc: string
}

// Action
export const addPost = (newPostText: string): addPostType => ({
  type: ADD_POST,
  newPostText,
})

export const deletePost = (postID: number): deletePostType => ({
  type: DELETE_POST,
  postID,
})

const setUserProfile = (profile: profileType): setUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
})

const setUserStatus = (status: string): setUserStatusType => ({
  type: SET_USER_STATUS,
  status,
})

const savePhotoSuccess = (photos: photosType): savePhotoSuccessType => ({
  type: SET_USER_PHOTO,
  photos,
})

const updateAboutMeSuccess = (
  aboutMeText: string
): updateAboutMeSuccessType => ({
  type: SET_USER_ABOUT_ME,
  aboutMeText,
})

const updatelookFAJobDescSuccess = (
  lookFAJobDesc: string
): updatelookFAJobDescSuccessType => ({
  type: SET_LOOK_FOR_A_JOB_DESC,
  lookFAJobDesc,
})

// Thunk
export const getProfile = (userID: number) => async (dispatch: any) => {
  const response = await profileAPI.getProfile(userID)
  dispatch(setUserProfile(response))
}

export const getUserStatus = (userID: number) => async (dispatch: any) => {
  const response = await profileAPI.getUserStatus(userID)
  dispatch(setUserStatus(response))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    const response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
      dispatch(setUserStatus(status))
    }
  } catch (error) {
    console.log(error)
  }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
  const response = await profileAPI.savePhoto(file)
  if (response.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.photos))
  }
}

export const updateAboutMe = (
  aboutMeText: string,
  profile: profileType
) => async (dispatch: any) => {
  const response = await profileAPI.updateAboutMe(aboutMeText, profile)
  if (response.resultCode === 0) {
    dispatch(updateAboutMeSuccess(aboutMeText))
  }
}

export const updateLookFAJobDesc = (
  lookFAJobDesc: string,
  profile: profileType
) => async (dispatch: any) => {
  const response = await profileAPI.updateLookFAJobDesc(lookFAJobDesc, profile)
  if (response.resultCode === 0) {
    dispatch(updatelookFAJobDescSuccess(lookFAJobDesc))
  }
}

export default profileReducer
