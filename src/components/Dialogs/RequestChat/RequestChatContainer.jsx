import React from 'react'
import {onSubmitMessageCreator, updateNewMessageTextCreator} from "../../../redux/message-reducer"
import RequestChat from "./RequestChat"
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    state: state.messagesPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageText: (text) => {
      dispatch(updateNewMessageTextCreator(text))
    },
    sendMessage: (chatID) => {
      dispatch(onSubmitMessageCreator(chatID))
    }
  }
}

const RequestChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestChat)

export default RequestChatContainer

// const RequestChatContainer = (props) => {
//   return (
//     <StoreContext.Consumer>
//       { (Store) => {
//
//         let state = Store.getState().messagesPage
//
//         const updateNewMessageText = (text) => {
//           let action = updateNewMessageTextCreator(text)
//           Store.dispatch(action)
//         }
//
//         const sendMessage = (chatID) => {
//           let action = onSubmitMessageCreator(chatID)
//           Store.dispatch(action)
//         }
//         return (
//           <RequestChat state={state}
//                        updateNewMessageText={updateNewMessageText}
//                        sendMessage={sendMessage}/>
//         )
//       }
//     }
//     </StoreContext.Consumer>
//   )
// }
