import React from 'react'
import logo from "../../utils/logo.png"
function ProfilePage() {
  return (
      <div style={{
          minHeight: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
      }}>
        <img src={logo} style={{
            maxWidth: "40%",
            maxHeight: '100%',
            borderRadius: "50%"
        }}/>
        <h2>Leaf Analysis</h2>
        </div>
  )
}

export default ProfilePage