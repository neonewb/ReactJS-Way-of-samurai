import {combineReducers, createStore} from "redux"
import profileReducer from "./profile-reducer"
import messageReducer from "./message-reducer"
import usersReducer from "./users-reducer"

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messageReducer,
  usersPage: usersReducer
})

let Store = createStore(reducers)

window.Store = Store

export default Store