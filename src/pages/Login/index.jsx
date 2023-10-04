import React,{ useState, useEffect, useRef } from 'react'
import { LoginCard, LightSwitch, SignupCard } from "../../components"
import "./style.css"
import sound from "../../assets/audio/lightswitch.wav"
import { BlobToImage } from "../../components"

const Login = () => {

  const [cardHeight, setCardHeight] = useState(window.innerHeight *.6)

  const [toggleSwitch, setToggleSwitch] = useState(false)

  const focusStyle = {
    "background": "#EDE4D9",
    // "background": "linear-gradient(0deg, rgba(20,8,14,1) 0%, rgba(250,248,242,1) 100%)",
    "backgroundColor":"#EDE4D9"

  }

  function playAudio() {
    new Audio(sound).play()
  }

  function changeState() {
    setToggleSwitch(!toggleSwitch)
  }

  function keyboardSwitch(e){
    if (e.key == " "){
      playAudio()
      setToggleSwitch(!toggleSwitch)
    }
  }

  useEffect(() => {
    function handleResize(){
      setCardHeight(window.innerHeight *.6)
    }

    window.addEventListener("resize",handleResize)
    return () => window.removeEventListener("resize",handleResize)
  },[])

  return (
    <div id='login-page' onKeyDown={keyboardSwitch} tabIndex={0} aria-label='Press space to switch between login and register'>
        <LoginCard cardHeight={cardHeight} toggleSwitch={toggleSwitch} focusStyle={focusStyle} />

        <LightSwitch changeState={changeState} toggleSwitch={toggleSwitch}/>

        <SignupCard cardHeight={cardHeight} toggleSwitch={toggleSwitch} focusStyle={focusStyle} setToggleSwitch={setToggleSwitch}/>
    </div>
  )
}

export default Login
