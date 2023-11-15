import React, { useState } from 'react'
import ImageCarousel from './ImageCarousel'
import "./styles.css"
import ReactCompareImage from 'react-compare-image';
function Results(props) {

    const handleAnalyseClick = (selectedimage) => {
        const url = "http://localhost:5000/rgbToGrayScale/"
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS');

        fetch(url, {
            method: 'POST',
            crossorigin: true,
            headers: headers,
            body: JSON.stringify({image: selectedimage}) // Convert the data to JSON
          })
          .then((response) => {
            return response.json();
          })
          .then(image => {
            console.log(image)
            setGreyScaleImage(image.img)
          })

    }
    const [selectedimage, setResultImage] = useState(null)
    const [greyScaleImage, setGreyScaleImage] = useState(null)
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
                    <ImageCarousel setResultImage = {setResultImage} images = {props.subimages}/>
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
                            <li> Image Resoultion : <span style={{fontWeight: "1000"}}>{props.imagedata.height} x {props.imagedata.width}</span></li>
                            <li>Time Taken for model to run : <span style={{fontWeight: "1000"}}>{props.imagedata.elapsed_time}s</span></li>
                            <li>Number of Images Detected : <span style={{fontWeight: "1000"}}>{props.imagedata.image_array.length}</span></li>
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
                       {
                            greyScaleImage ?
                            <div  style={{width: "60%", height: "60%", marginBottom: "2rem"}}>
                                <ReactCompareImage leftImage = {selectedimage} rightImage= {greyScaleImage}/>   
                            </div>
                            :
                           <img src = {selectedimage} style={{width: "60%", height: "60%", padding: "1rem"}}></img>
                       }
                </div>
                  <button className='button-styles'style={{ 
                      height: "10%"}} onClick={() => handleAnalyseClick(selectedimage)}>
                      <span className='button-text'>Analyse</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Results