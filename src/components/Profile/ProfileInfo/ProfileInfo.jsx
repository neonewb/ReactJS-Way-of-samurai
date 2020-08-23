import React from "react"
import Style from "./ProfileInfo.module.css"

export default function ProfileInfo() {
  return (
    <div>
    <div className={Style.mainImg}>
      <img src="bgNetwork.jpg" alt="network" />
    </div>
    <div>
      Ava + desc
    </div>
    </div>
  );
}
