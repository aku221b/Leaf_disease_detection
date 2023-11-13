import React, {useState} from 'react'
import Uploader from "../Uploader.js"
import Results from '../Results.js'
function RightWindow(props) {
  return (
    <div style={{
        display: "flex",
        width: "80%",
        display: "flex",
        justifyContent: "center",
    }}>
      {true ? <Results resultImage = {props.resultImage}/> : 
      <Uploader 
        handleAnalyseOpen={props.handleAnalyseOpen} 
        loading  = {props.loading}
        setLoading = {props.setLoading} 
        />
      }
    </div>
  )
}

export default RightWindow