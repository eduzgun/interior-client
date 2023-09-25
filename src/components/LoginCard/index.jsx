import React,{ useState } from 'react'
import "./style.css"

const LoginCard = ({ cardHeight,toggleSwitch,focusStyle }) => {

    const [username, setUsername] = useState("")
    const [password,setPassword] = useState("")

    const activeStyle = {
      "border": "1px solid var(--outline)",
      "color": "var(--outline)"
    }

    const showLight = {
        "display":"block"
    }

    const lampShade = {
        "filter": "brightness(1)"
    }

    function handleUserInput(e) {
        setUsername(e.target.value)
    }
    
    function handlePassInput(e){
        setPassword(e.target.value)
    }
    
    function sendLoginRequest(e){
        e.preventDefault()
        console.log(username,password)
        setUsername("")
        setPassword("")
    }

  return (
    <div id="login"  className="card" style={Object.assign({"height":cardHeight},!toggleSwitch ? focusStyle : {"color":"var(--outline)"})} >
        <div className="lamp">
            <img src="./src/assets/images/lamp.png" alt="lamp" id='left-lamp' style={!toggleSwitch ? lampShade : {}}/>
            <div id="llight" style={!toggleSwitch ? showLight : {}}></div>
        </div>
        <header>
            <h2>Log In</h2>
            <p>*placeholder text*</p>
        </header>
        <form data-testid={"login-form"} onSubmit={sendLoginRequest}>
            <label htmlFor="username">username</label>
            <input data-testid={"input"} type="text" name="username" id="user-input" value={username} placeholder='>' onChange={handleUserInput} autoComplete='false' disabled={toggleSwitch} style={toggleSwitch ? activeStyle : {}} required/>

            <label htmlFor="password">password</label>
            <input data-testid={"input"} type="password" name="password" id="password-input" value={password} placeholder='>' onChange={handlePassInput} autoComplete='false' disabled={toggleSwitch} style={toggleSwitch ? activeStyle : {}} required/>

            <button type='submit' id='signin-btn' disabled={toggleSwitch} style={toggleSwitch ? activeStyle : {}}>Sign In</button>
        </form>
    </div>
  )
}

export default LoginCard