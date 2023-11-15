import React, {useState} from "react"
import LeftWindow from "./components/LeftWindow/LeftWindow.js";
import RightWindow from "./components/RightWindow/RightWindow.js";
import {Circles} from 'react-loader-spinner';

function App() {
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultImage, setResultImage] = useState(null);
  const [subimages, setSubimages] = useState(null)
  const [imagedata, setImageData] = useState(null)
  const handleAnalyseOpen = async  (image) => {
    if(image)
    {
      const data = new FormData();
      data.append("image", image)

      setLoading(true)
      const url = "http://localhost:5000/upload/"
      
      fetch(url, {
        method: 'POST',
        body: data // Convert the data to JSON
      })
      .then((response) => {
        console.log(image)
        return response.json();
      })
      .then(image => {
        setImageData(image)
        setSubimages(image.image_array)
        setResultImage(image.img)
        setLoading(false);
        setShowResults(true);
      })
    }
    
  }
  const handleAnalyseClose = () => {
    setShowResults(false)
  }
  return (
    <div style = {{
      position: 'fixed',
      display: "flex",
      minWidth: "100%",
      minHeight: "100%",
      top: '0',
      left: '0',
      backgroundColor: "#F0F0F0"
    }}>
      <LeftWindow handleAnalyseClose={handleAnalyseClose} showResults={showResults} />
      <RightWindow 
      handleAnalyseOpen={handleAnalyseOpen} 
      showResults={showResults} 
      loading = {loading}
      setLoading = {setLoading} 
      resultImage = {resultImage}
      setResultImage = {setResultImage}
      subimages = {subimages}
      imagedata = {imagedata}/>
      
    </div>
  );
}

export default App;
