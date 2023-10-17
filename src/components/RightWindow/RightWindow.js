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
      {props.showResults ? <Results /> : <Uploader handleAnalyseOpen={props.handleAnalyseOpen} />}
    </div>
  )
}

export default RightWindow