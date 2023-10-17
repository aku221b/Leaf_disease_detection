import React, { useRef, useState } from "react";
import Upload from "../utils/Upload.png"
import {Circles} from 'react-loader-spinner';

function Uploader(props) {
  const uploadImageref = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleImageUpload = (event) => {
    setLoading(true)
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result); // Set the selected image for rendering
      };
      reader.readAsDataURL(selectedFile); // Read the file as a data URL
    }
    setUploadedImage(selectedFile)
    setLoading(false)
  }
  const handleImageClick = () => {
    if (uploadImageref.current) {
      uploadImageref.current.click();
    }
  }
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minWidth: "50%",
      maxHeight: "60%",
      marginTop: "6rem",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h2 style={{
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Kanit',
        fontSize: '48px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal'
      }}
      >New Scan</h2>
      <div style={{
        minHeight: "90%",
        minWidth: "100%",
        borderRadius: "10px",
        border: "1px solid black",
        backgroundColor: "#ADB5BD",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {loading ? <Circles /> : ""}
        {!loading ? (uploadedImage 
        ? 
        <img id="image-upload-img" src={uploadedImage} alt="" style={{
          overflow: "hidden",
          width: "200px",
          height: "auto",
          paddingTop: "1rem",
        }} /> 
        : 
        <img id="image-upload-img" src={Upload} alt="" style={{
          overflow: "hidden",
          width: "200px",
          height: "auto",
          paddingTop: "1rem",
        }}/>) : ""}
        <h1 style={{
          color: 'rgba(0, 0, 0, 0.60)',
          textAlign: 'center',
          fontFamily: 'Inter',
          fontSize: '50px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal'
        }}  >CHOOSE SCAN</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          marginTop: "1rem",
          minHeight: "10%",
        }}>
        <input type="file" id="image-upload" style={{ display: "none" }} onChange={handleImageUpload} ref={uploadImageref}/>
        <button style={{
          width: "30%",
          borderRadius: '25px',
          border: '4px solid #000',
          backgroundColor: "#E9ECEF",
          display: "flex",
          justifyContent: "center",
          cursor: "pointer"
        }} onClick={handleImageClick}
        ><p style={{
          color: '#000',
          fontFamily: 'Inter',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal',
          margin: "0", 
          padding: "8px"}}>
            Upload
          </p></button>
        <button style={{
          width: "30%",
          borderRadius: '25px',
          border: '4px solid #000',
          backgroundColor: "#343A40",
          cursor: "pointer"
        }} 
          onClick={props.handleAnalyseOpen}>
          <p style={{
            color: '#FFF',
            fontFamily: 'Inter',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            margin: "0",
            padding: "0"
          }}>
            Analyse
          </p> </button>
      </div>
      </div>
  )
}

export default Uploader