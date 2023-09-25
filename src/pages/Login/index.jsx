import React,{ useState, useEffect, useRef } from 'react'
import "./style.css"

const Login = () => {

  const [username, setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [cardHeight, setCardHeight] = useState(window.innerHeight *.55)

  const [toggleSwitch, setToggleSwitch] = useState(false)

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

  useEffect(() => {
    function handleResize(){
      setCardHeight(window.innerHeight *.55)
    }

    window.addEventListener("resize",handleResize)
    return () => window.removeEventListener("resize",handleResize)
  },[])

  return (
    <div id='login-page'>
        <div className="card" style={{"height":cardHeight}}>
            <header>
              <h2>Log In</h2>
              <p>*placeholder text*</p>
            </header>
            <form onSubmit={sendLoginRequest}>
              <label htmlFor="username">username</label>
              <input type="text" name="username" id="user-input" value={username} placeholder='username' onChange={handleUserInput} autoComplete='false'/>

              <label htmlFor="password">password</label>
              <input type="text" name="password" id="user-input" value={password} placeholder='password' onChange={handlePassInput} autoComplete='false'/>

              <button type='submit' id='signin-btn'>Sign In</button>

              <a href="" id='forgot-password'>Forgot Password?</a>
            </form>
        </div>

        <div className="switch">
          <div id="toggle"></div>
        </div>

        <div className="card" style={{"height":cardHeight}}>

        </div>
    </div>
  )
}

export default Login