import React, {useState} from "react"
import LeftWindow from "./components/LeftWindow/LeftWindow.js";
import RightWindow from "./components/RightWindow/RightWindow.js";
import {Circles} from 'react-loader-spinner';

function App() {
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultImage, setResultImage] = useState(null);
  const handleAnalyseOpen = async  (image) => {
    if(image)
    {
      setLoading(true)
      const url = "http://localhost:5000/upload/"
      
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
        body: JSON.stringify({data: image}) // Convert the data to JSON
      })
      .then((response) => {
        return response.blob();
      })
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setResultImage(imageUrl)
        setLoading(false);
        setShowResults(true);
      })
      .catch(e => console.log(e))
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
      setResultImage = {setResultImage}/>
    </div>
  );
}

export default App;
