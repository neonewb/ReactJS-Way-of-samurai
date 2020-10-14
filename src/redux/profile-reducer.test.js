import profileReducer, { addPost, deletePost } from './profile-reducer'

let state = {
  postData: [
    {
      id: 0,
      post: 'React Is A JavaScript Library For Building User  Interfaces',
    },
    {
      id: 1,
      post: 'Redux Is A Predictable State Container for JS Apps',
    },
  ],
}

test('length of post should be incremented', () => {
  let action = addPost('NeoRuslan')

  let newState = profileReducer(state, action)

  expect(newState.postData.length).toBe(3)
})

test('message of new post should be NeoRuslan', () => {
  let action = addPost('NeoRuslan')

  let newState = profileReducer(state, action)

  expect(newState.postData[2].post).toBe('NeoRuslan')
})

test('after delete length of array should be decremented', () => {
  let action = deletePost(0)

  let newState = profileReducer(state, action)

  expect(newState.postData.length).toBe(1)
})

test('after delete length of array shouldt be decremented if id is incorrect', () => {
  let action = deletePost(100)

  let newState = profileReducer(state, action)

  expect(newState.postData.length).toBe(2)
})
