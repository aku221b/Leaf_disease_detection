import React from 'react'

function Results() {
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
            <div style={{
                width: "60%",
                borderRadius: "20px",
                background: "#ADB5BD"
            }}>
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
                  <button style={{ 
                      height: "10%",
                      borderRadius: '15px',
                      background: '#343A40',
                      cursor: "pointer" }}>
                      <span style={{
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: '26px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: 'normal'
                      }}>Save</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Results