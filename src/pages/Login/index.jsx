import React,{ useState, useEffect, useRef } from 'react'
import { LoginCard, LightSwitch, SignupCard } from "../../components"
import "./style.css"

const Login = () => {

  const [cardHeight, setCardHeight] = useState(window.innerHeight *.6)

  const [toggleSwitch, setToggleSwitch] = useState(false)

  const focusStyle = {
    "background": "linear-gradient(0deg, rgba(15,13,20,1) 0%, rgb(60,62,73) 81%)",
    "backgroundColor":"var(--outline)"

  }

  function changeState() {
    setToggleSwitch(!toggleSwitch)
  }

  useEffect(() => {
    function handleResize(){
      setCardHeight(window.innerHeight *.6)
    }

    window.addEventListener("resize",handleResize)
    return () => window.removeEventListener("resize",handleResize)
  },[])

  return (
    <div id='login-page'>
        <LoginCard cardHeight={cardHeight} toggleSwitch={toggleSwitch} focusStyle={focusStyle} />

        <LightSwitch changeState={changeState} toggleSwitch={toggleSwitch}/>

        <SignupCard cardHeight={cardHeight} toggleSwitch={toggleSwitch} focusStyle={focusStyle} setToggleSwitch={setToggleSwitch}/>

    </div>
  )
}

export default Login