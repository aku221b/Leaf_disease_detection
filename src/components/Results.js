import React, { useState } from 'react'
import ImageCarousel from './ImageCarousel'
import "./styles.css"

function Results(props) {

    const carouselImageClickHandler = (e) => {
        console.log(e)
    }
    const images = [
        {"img": "http://localhost:5000/images/newimg0.jpg"},
        {"img": "http://localhost:5000/images/newimg1.jpg"},
        {"img": "http://localhost:5000/images/newimg2.jpg"},
        {"img": "http://localhost:5000/images/newimg3.jpg"},
        {"img": "http://localhost:5000/images/newimg4.jpg"},
      ];
    const stats = {
        "resolution": "250 x 300",
        "time_taken": "3.2s",
        "number_of_images_detected": "5",
    }

    const [selectedimage, setResultImage] = useState(null)
  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "2rem",
        minWidth: "80%",
    }}>
        <h1 style={{
            textAlign: "center"
        }}>
            Results
        </h1>

        <div style={{
            display: 'flex',
            height: '80%',
            justifyContent: "space-between"
        }}>

            <div className='Left_panel' style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                width: "60%",
                borderRadius: "20px",
                background: "#ADB5BD",
                display: "flex",
                alignItems: "center"
            }}>{props.resultImage ? <img id="image-upload-img" src={props.resultImage} alt="" style={{
                width: "200px",
                height: "auto",
                }} /> : ""}
                <div className=' image_selector' style={{width: "100%"}}>
                    <ImageCarousel setResultImage = {setResultImage} images = {images} carouselImageClickHandler = {carouselImageClickHandler}/>
                </div>
            </div>
            <div style={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",

            }}>
                  <div style={{
                      height: "20%", 
                      borderRadius: '20px',
                      background: '#ADB5BD',
                    }}
                    className='stats'>
                         <ul>
                            <li> Image Resoultion : <span style={{fontWeight: "1000"}}>{stats.resolution}</span></li>
                            <li>Time Taken for model to run : <span style={{fontWeight: "1000"}}>{stats.time_taken}</span></li>
                            <li>Number of Images Detected : <span style={{fontWeight: "1000"}}>{stats.number_of_images_detected}</span></li>
                        </ul>
                </div>
                  <div style={{ height: "50%",
                      borderRadius: '20px',
                      background: '#ADB5BD',
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                        }}
                    >
                       <img src = {selectedimage} style={{width: "60%", height: "60%", padding: "1rem"}}></img> 
                </div>
                  <button className='button-styles'style={{ 
                      height: "10%"}}>
                      <span className='button-text'>Analyse</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Results