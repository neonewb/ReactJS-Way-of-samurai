import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: { 'API-KEY': '6f3fb205-f3bb-4ff9-a41f-3fd20f5c4c75' },
})

export const usersAPI = {
  async getUsers(pageNumber = 1, pageSize = 4) {
    const response = await axiosInstance.get(
      `users?page=${pageNumber}&count=${pageSize}`
    )
    return response.data
  },

  async followUser(userID) {
    const response = await axiosInstance.post(`follow/${userID}`)
    return response.data.resultCode
  },

  async unFollowUser(userID) {
    const response = await axiosInstance.delete(`follow/${userID}`)
    return response.data.resultCode
  },
}

export const authAPI = {
  async authMe() {
    const response = await axiosInstance.get('auth/me')
    return response.data
  },
  async login(email, password, rememberMe = false, captcha) {
    const response = await axiosInstance.post('auth/login', {
      email,
      password,
      rememberMe,
      captcha,
    })
    return response.data
  },
  async logOut() {
    const response = await axiosInstance.delete('auth/login')
    return response.data
  },
}

export const securityAPI = {
  async getCaptcha() {
    const response = await axiosInstance.get('security/get-captcha-url')
    return response.data
  },
}

export const profileAPI = {
  async getProfile(userID) {
    const response = await axiosInstance.get(`profile/${userID}`)
    return response.data
  },

  async getUserStatus(userID) {
    const response = await axiosInstance.get(`profile/status/${userID}`)
    return response.data
  },

  async updateStatus(status) {
    const response = await axiosInstance.put('profile/status', {
      status,
    })
    return response.data
  },

  async savePhoto(photoFile) {
    const formData = new FormData()
    formData.append('image', photoFile)
    const response = await axiosInstance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async updateAboutMe(aboutMeText, profile) {
    const response = await axiosInstance.put('profile', {
      ...profile,
      aboutMe: aboutMeText,
    })
    return response.data
  },

  async updateLookFAJobDesc(lookFAJobDesc, profile) {
    const response = await axiosInstance.put('profile', {
      ...profile,
      lookingForAJobDescription: lookFAJobDesc,
    })
    return response.data
  },
}
