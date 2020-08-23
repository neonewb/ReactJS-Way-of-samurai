import React from "react";
import Style from "./Message.module.css";

export default function Message(props) {
  return (
    <div className={Style.message}>
      {props.message}
    </div>
  );
}