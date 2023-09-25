import React from 'react'
import "./style.css"

const LightSwitch = ({ changeState, toggleSwitch }) => {

    const shadedStyle = {
        "background": "rgb(25,23,30)",
        "background": "linear-gradient(0deg, rgb(170, 170, 170) 0%, rgb(120,121,122) 81%)",
        "width": "108px",
        "height": "140px",
        "left": "-4px",
        "top": "-65px",
        "transform": "rotateX(85deg)"
    }

    const mainStyle = {
        "background": "rgb(25,23,30)",
        "background": "linear-gradient(0deg, rgb(35,36,37) 0%, rgb(160, 160, 160) 91%)",
        "top": "-23px",
        "left":"-2px",
        "width": "103px",
        "height": "290px",
        "transform": "rotateX(-40deg)"
    }

  return (
    <div className="switch-container">
        <div className="switch" onClick={changeState}>
            <div id="toggle">
                <div id="mainbit" style={toggleSwitch ? mainStyle : {}}></div>
                <div id="shadedbit" style={toggleSwitch ? shadedStyle : {}}></div>
            </div>
        </div>
    </div>
  )
}

export default LightSwitch