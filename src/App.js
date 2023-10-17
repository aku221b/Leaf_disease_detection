import React, {useState} from "react"
import LeftWindow from "./components/LeftWindow/LeftWindow.js";
import RightWindow from "./components/RightWindow/RightWindow.js";

function App() {
  const [showResults, setShowResults] = useState(false)
  const handleAnalyseOpen = () => {
    setShowResults(true)
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
      <RightWindow handleAnalyseOpen={handleAnalyseOpen} showResults={showResults}/>
    </div>
  );
}

export default App;
