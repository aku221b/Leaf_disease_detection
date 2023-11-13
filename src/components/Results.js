import React from 'react'
import ImageCarousel from './ImageCarousel'
import "./styles.css"
import img1 from "../utils/carousel_test-images/1.png"
import img2 from "../utils/carousel_test-images/3.png"

function Results(props) {

    const carouselImageClickHandler = (e) => {
        console.log(e)
    }
    const images = [
        img1,
        img2,
      ];
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
                    <ImageCarousel images = {images} carouselImageClickHandler = {carouselImageClickHandler}/>
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
                      background: '#ADB5BD'
                    }}>
                </div>
                  <div style={{ height: "50%",
                      borderRadius: '20px',
                      background: '#ADB5BD'
                        }}>
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