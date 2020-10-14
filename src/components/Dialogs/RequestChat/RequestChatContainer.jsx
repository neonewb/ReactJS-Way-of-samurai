import {sendMessage} from "../../../redux/message-reducer"
import RequestChat from "./RequestChat"
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    state: state.messagesPage,
  }
}

const RequestChatContainer = connect(
  mapStateToProps, {
    sendMessage
  }
)(RequestChat)

export default RequestChatContainer