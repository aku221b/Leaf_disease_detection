import React from 'react'
import ProfilePage from './ProfilePage.js'

function LeftWindow(props) {
  return (
    <div style={{
        minHeight: "100%",
        maxWidth: "20%",
        backgroundColor: "#CCCCCC",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }}>
      <ProfilePage/>
      { props.showResults ? <button style={{
        height: "8%",
        borderRadius: '15px',
        background: '#343A40',
        margin: "0 6px 1rem 6px",
        cursor: "pointer" 
      }}
        onClick = { props.handleAnalyseClose }
        >
        <span style={{
          color: '#FFF',
          fontFamily: 'Inter',
          fontSize: '26px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal'
        }}>
          Back
        </span>
       </button> : ""} 
    </div>
  )
}

export default LeftWindow