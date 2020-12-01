export type postType = {
  id: number
  post: string
}

export type photosType = {
  small: string | null
  large: string | null
} | string

export type contactsType = {
  mainLink: string
}

export type profileType = {
  fullName: string
  aboutMe: string
  photos: photosType
  lookingForAJob: boolean
  lookingForAJobDescription: string
  contacts: contactsType
}

export type userType = {
  id: number
  name: string
  photos: photosType
}
